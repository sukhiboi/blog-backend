#cloning frontend
git clone https://github.com/sukhiboi/blog-frontend.git;

#creating react build
cd blog-frontend;
npm install;
npm test;
npm run build;

#cloning build to root
mv build ../build;

#deleting frontend
cd ..;
rm -rf blog-frontend;

#cloning backend
git clone https://github.com/sukhiboi/blog-backend.git;

cd blog-backend;
npm install;
npm test;
rm -rf node_modules;

#cloning backend to root
cp -R ./* ..;

#deleting backend
cd ..;
rm -rf blog-backend;

rm -rf node_modules;