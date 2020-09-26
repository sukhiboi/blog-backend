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
echo 'ran tests'
rm -rf node_modules;
echo 'delete modules'

#cloning backend to root
echo 'copying build and server to root'
cp -R ./* ..;
ls

#deleting backend
cd ..;
pwd
rm -rf blog-backend;
echo 'deleting backend'

rm -rf node_modules;