'use server'

import {
  ECWID_API_URL,
  ECWID_STOREFRONT_API_URL,
  isEcwidError,
  MAIN_CATEGORY,
  TAGS,
} from "@/constants/ecwid";

const store_id = process.env.ECWID_STORE_ID;

const api_endpoint = `${ECWID_API_URL}${store_id}`;
const storefront_api_endpoint = `${ECWID_STOREFRONT_API_URL}${store_id}`;

export async function ecwidFetch({
  method,
  path,
  useStorefrontAPI,
  query,
  headers,
  cache,
  tags,
  payload,
  revalidate,
}) {
  try {
    var options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.ECWID_API_KEY,
        ...headers,
      },
      cache: cache,
      ...(tags && { next: { tags: tags } }),
    };

    if (revalidate) {
      options.next = { ...options.next, ...{ revalidate: revalidate } };
      console.log(options.next);
    }

    if (payload) {
      options.body = JSON.stringify(payload);
    }

    let url;

    if (useStorefrontAPI) {
      url = storefront_api_endpoint + path;
    } else {
      url = api_endpoint + path;
    }

    if (query) {
      const searchParams = new URLSearchParams();

      Object.entries(query).forEach(([key, values]) => {
        if (Array.isArray(values)) {
          values.forEach((value) => {
            searchParams.append(key, value);
          });
        } else {
          searchParams.append(key, values);
        }
      });

      url += url.indexOf("?") >= 0 ? "&" : "?";
      url += searchParams.toString();
    }

    const result = await fetch(url, options);

    let body;

    try {
      body = await result.json();
    } catch (e) {
      console.error(e);
      body = false;
    }

    if (body.errors) {
      console.log(body.errors);
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isEcwidError(e)) {
      throw {
        status: e.status || 500,
        message: e.message,
      };
    }

    throw {
      error: e,
    };
  }
}

export async function getProducts({ query, limit = 40 }) {
  var queryParams = {};

  queryParams.enabled = "true";
  queryParams.limit = limit;

  const res = await ecwidFetch({
    method: "GET",
    path: `/products`,
    query: { ...queryParams, ...query },
  });

  return res.body?.items;
}

export async function getCategories({ query, limit = 40 }) {
  var queryParams = {};

  queryParams.enabled = "true";
  queryParams.limit = limit;

  const res = await ecwidFetch({
    method: "GET",
    path: `/categories`,
    query: { ...queryParams, ...query },
  });

  return res.body?.items;
}