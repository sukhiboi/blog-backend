ls -al;

git status;

cat .git/congif;

git remote add heroku https://git.heroku.com/sukhiboi-blog.git;

git.congif --gloabal user.name "sukhiboi";
git.congif --gloabal user.email "41sukhdevsingh@gmail.com";

git add .;

git commit -m "New release";

git push heroku master;