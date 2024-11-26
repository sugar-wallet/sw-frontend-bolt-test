git stash
git checkout main
git pull origin main
npm install --legacy-peer-deps
pm2 stop sw-web-app
rm -rf .next/
npm run build
pm2 restart sw-web-app