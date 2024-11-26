<template>
  <main>
    <ContentDoc path="/docs" />
  </main>
</template>

<style>
.text-primary {
  --tw-text-opacity: 1;
  color: rgb(var(--color-primary-DEFAULT) / var(--tw-text-opacity));
}

code:not(.shiki *) {
  padding: 0.125em 0.50em;
}

pre.shiki, code:not(.shiki *) {
  border-radius: 0.25em;
}

pre.shiki {
  padding: 1em;
  margin: 1em 0;
}

html pre.shiki, html code:not(.shiki *) {
  background-color: rgb(var(--color-gray-200));
}

html.dark pre.shiki, html.dark code:not(.shiki *) {
  background-color: rgb(var(--color-gray-800));
}

table {
  background-color: rgb(var(--color-gray-50));
  margin: 1.5em 0;
}

html.dark table {
  background-color: rgb(var(--color-gray-950));
}

table, th, td {
  border: 1px solid rgb(var(--color-gray-300));
  border-collapse: collapse;
}

html.dark table, html.dark th, html.dark td {
  border-color: rgb(var(--color-gray-600));
}

td, th {
  padding: 0.5em 1em;
}
</style>