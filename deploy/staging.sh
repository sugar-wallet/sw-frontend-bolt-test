git stash
git checkout staging
git pull origin staging
cp .env.staging .env.production
npm install --legacy-peer-deps
pm2 stop sw-web-app
rm -rf .next/
npm run build
pm2 restart sw-web-app