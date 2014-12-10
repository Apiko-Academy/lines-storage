Package.describe({
  name: 'lines-storage',
  summary: 'Read and write string lines',
  version: '0.0.1',
  git: 'https://github.com/JSSolutions/lines-storage.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('csv-storage.js');
  api.export('CsvStorage', 'server');
});
