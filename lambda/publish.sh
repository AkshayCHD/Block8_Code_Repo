rm -f index.zip 
rm -f zipper/index.js
cd zipper
cp ../index.js ./ 
zip ../index.zip index.js
cd .. 
aws2 lambda update-function-code --function-name myRandomFunction --zip-file fileb://index.zip
