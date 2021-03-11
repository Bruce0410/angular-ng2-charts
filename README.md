npm install
#gh-pages
git add .
ng build --prod --base-href=/angular-ng2-charts/
npx ngh --dir=dist/angular-ng2-charts  --no-silent
