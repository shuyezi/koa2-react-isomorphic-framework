#!/usr/bin/env bash

rm -rf ./output
rm -rf tripgm-fe.tar.gz
npm run clean
npm run prod
mkdir output
cp -r ./configs ./output/
cp -r ./middlewares ./output/
cp -r ./models ./output/
cp -r ./node_modules ./output/
cp -r ./public ./output/
cp -r ./routes ./output/
cp -r ./views ./output/
cp -r ./.babelrc ./output/
cp -r ./app.js ./output/
cp -r ./assetsMap.js ./output/
cp -r ./package.json ./output/
cd output
tar zcf ../tripgm-fe.tar.gz ./*
cd ../
rm -rf ./output
npm run clean