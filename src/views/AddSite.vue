<script setup lang="ts">
import debounce from '@/utils/debounce';
import { isValidURL, sanitiseURL } from '@/utils/url';
import { rmSync } from 'fs';
import { ref, type Ref } from 'vue';
let apiBase = import.meta.env.APP_SERVER_URL;

const url = ref('');
const manualPassword = ref(false);
const username = ref('');
const applicationPassword = ref('');
const checkingPassword = ref(false);

const beginAuthFlow = () => {
  if (!isValidURL(url.value)) return;
  url.value = sanitiseURL(url.value);

  if (manualPassword.value) {
    //checkApplicationPassword();
    return;
  }

  window.location.replace(`${apiBase}/site-auth/${url.value}`);
};

const checkApplicationPassword = (url, password) => {
  checkingPassword.value = true;
  fetch(`https://${url}/wp-json/wp/v2/settings`, {
    headers: {
      Authorization: `Basic ${btoa(`wpmanager:${password}`)}`
    }
  });
};

enum SiteAPIStatus {
  UNKNOWN = 'unknown',
  CHECKING = 'checking',
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  INVALID_URL = 'invalid_url'
}

const siteAPIStatus: Ref<SiteAPIStatus> = ref(SiteAPIStatus.UNKNOWN);
let abortController = new AbortController();
const checkSiteAPI = debounce(() => {
  abortController.abort();
  abortController = new AbortController();

  if (!url.value) return;

  url.value = url.value.trim();

  if (!isValidURL(url.value)) {
    siteAPIStatus.value = SiteAPIStatus.INVALID_URL;
    return;
  }

  siteAPIStatus.value = SiteAPIStatus.CHECKING;

  url.value = sanitiseURL(url.value);

  fetch(`https://${url.value}/wp-json`, { signal: abortController.signal, }).then(async (res) => {
    if (res.status == 200) {
      siteAPIStatus.value = SiteAPIStatus.AVAILABLE;
      const data = await res.json();
      url.value = data.url.replace('https://', '');
    } else {
      siteAPIStatus.value = SiteAPIStatus.UNAVAILABLE;
    }
  }).catch((e) => {
    if (e.name == 'AbortError') {
      siteAPIStatus.value = SiteAPIStatus.CHECKING;
      return;
    }
    siteAPIStatus.value = SiteAPIStatus.UNAVAILABLE;
  });
}, 1000);
</script>

<template>
  <main>
    <form id="addSite" style="max-width: 600px;display: none;">
      <div class="input-group mb-2">
        <input type="text" class="form-control" name="url" id="url" placeholder="https://example.com"
          aria-describedby="submitBtn" required>
        <button class="btn btn-primary" type="submit" id="submitBtn" :disabled="!isValidURL(url)"
          v-if="!manualPassword">Add WordPress Site</button>
      </div>
      <div class="input-group mb-2" v-if="manualPassword">
        <input type="text" class="form-control" name="username" id="username" v-model="username" placeholder="Username"
          aria-describedby="manualSubmitBtn" required>
        <input type="password" class="form-control" name="applicationPassword" id="applicationPassword"
          v-model="applicationPassword" placeholder="Application Password" aria-describedby="manualSubmitBtn" required>
        <button class="btn btn-primary" type="submit" id="manualSubmitBtn"
          :disabled="!isValidURL(url) || !url || (manualPassword && !applicationPassword) || (manualPassword && checkApplicationPassword)">Add
          WordPress Site</button>
      </div>
      <a class="form-text" @click="manualPassword = false; applicationPassword = ''" style="cursor: pointer;"
        v-if="manualPassword">I want to authorise by logging in</a>

    </form>

    <form style="max-width: 600px;" @submit.prevent="beginAuthFlow">
      <h1 class="h2">Add a WordPress Site</h1>
      <div class="form-text m-0 mb-2">WP Manager requires an <a href="https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/#basic-authentication-with-application-passwords" target="_blank">Application
          Password</a> to connect to your WordPress site. This is a secure way to allow WP Manager to connect to your
        site without needing to share your password. You can either do this by authorising through the site or providing the credentials manually.</div>

      <div class="mb-3">
        <label for="siteUrl" class="form-label">WordPress Site URL</label>
        <div class="mb-3">

          <div class="input-group">
            <span class="input-group-text" id="siteUrlPrefix">https://</span>
            <input type="text" class="form-control" placeholder="wordpress.com" aria-label="Username"
              @input="checkSiteAPI(); siteAPIStatus = SiteAPIStatus.UNKNOWN" aria-describedby="siteUrlPrefix"
              v-model="url">
          </div>
          <div id="emailHelp" class="form-text" v-if="url && siteAPIStatus != SiteAPIStatus.UNKNOWN">
            <div v-if="siteAPIStatus == SiteAPIStatus.CHECKING" class="d-flex align-items-center gap-2">
              <div class="spinner spinner-border spinner-border-sm text-muted"></div> Checking if the WordPress REST API
              is
              accessible
            </div>
            <div v-if="siteAPIStatus == SiteAPIStatus.AVAILABLE" class="d-flex align-items-center gap-2">
              <i class="bi bi-check-circle-fill text-success d-inline-flex"></i> The WordPress REST API is accessible
            </div>
            <div v-if="siteAPIStatus == SiteAPIStatus.UNAVAILABLE" class="d-flex align-items-center gap-2">
              <i class="bi bi-exclamation-triangle-fill text-warning d-inline-flex"></i> The WordPress REST API is not
              accessible
            </div>
            <div v-if="siteAPIStatus == SiteAPIStatus.INVALID_URL" class="d-flex align-items-center gap-2">
              <i class="bi bi-exclamation-triangle-fill text-warning d-inline-flex"></i> The URL you entered is invalid
            </div>
          </div>
        </div>
        <div class="row" v-if="manualPassword">
          <div class="col-5">
            <label for="siteUrl" class="form-label">WordPress Username/Email</label>
            <input type="text" class="form-control" placeholder="Email or Username" aria-label="Email or Username">
          </div>
          <div class="col">
            <label for="siteUrl" class="form-label">Application Password</label>
            <input type="text" class="form-control" placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
              aria-label="xxxx xxxx xxxx xxxx xxxx xxxx">
            <a class="form-text d-block text-end" :href="`https://${url}/wp-admin/profile.php#application-passwords-section`"
              target="_blank" v-if="url && siteAPIStatus == SiteAPIStatus.AVAILABLE">Direct link to generate an
              application password</a>
          </div>
        </div>
      </div>
      <hr>
      <div class="d-flex gap-2 flex-column align-items-end">
        <button type="submit" class="btn btn-primary d-flex" :disabled="siteAPIStatus != SiteAPIStatus.AVAILABLE"
          v-if="!manualPassword">
          <div class="bi bi-wordpress me-2"></div> Authorise with WordPress
        </button>
        <button type="submit" class="btn btn-primary d-flex" :disabled="siteAPIStatus != SiteAPIStatus.AVAILABLE"
          v-if="manualPassword">
          Add Site
        </button>
        <a class="form-text m-0 d-none" @click="manualPassword = true" style="cursor: pointer;" v-if="!manualPassword">I want to
          manually provide credentials</a>
        <a class="form-text m-0" @click="manualPassword = false" style="cursor: pointer;" v-if="manualPassword">I want to
          authorise with WordPress</a>
    </div>
  </form>
</main></template>