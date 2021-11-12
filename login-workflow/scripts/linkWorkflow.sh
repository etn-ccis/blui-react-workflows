#!/bin/bash
BLUE='\033[0;34m'
BBLUE='\033[1;34m' #BOLD
PURPLE='\033[0;35m'
RED='\033[0;31m'
BRED='\033[1;31m' #BOLD
GREEN='\033[0;32m'
BGREEN='\033[1;32m' #BOLD
GRAY='\033[1;30m'
NC='\033[0m' # No Color

echo -e "${BLUE}Building auth-shared package...${NC}"
cd ./shared-auth && yarn build && cd ..

echo -en "${BLUE}Creating new folder in login-workflow node_modules...${NC}"
rm -rf "./node_modules/@brightlayer-ui/react-auth-shared"
mkdir -p "./node_modules/@brightlayer-ui/react-auth-shared"
echo -e "${GREEN}Done${NC}"

echo -en "${BLUE}Copying auth-shared build output into node_modules...${NC}";
cp -r ./shared-auth/package.json ./node_modules/@brightlayer-ui/react-auth-shared/package.json
cp -r ./shared-auth/lib/. ./node_modules/@brightlayer-ui/react-auth-shared/lib
echo -e "${GREEN}Done${NC}"

echo -e "${BLUE}Building workflow package...${NC}"
yarn build

echo -en "${BLUE}Creating new folder in node_modules...${NC}"
rm -rf "./example/node_modules/@brightlayer-ui/react-auth-workflow"
mkdir -p "./example/node_modules/@brightlayer-ui/react-auth-workflow"

rm -rf "./example/node_modules/@brightlayer-ui/react-auth-shared"
mkdir -p "./example/node_modules/@brightlayer-ui/react-auth-shared"
echo -e "${GREEN}Done${NC}"

echo -en "${BLUE}Copying build output into node_modules...${NC}";
cp -r ./package.json ./example/node_modules/@brightlayer-ui/react-auth-workflow/package.json
cp -r ./dist/. ./example/node_modules/@brightlayer-ui/react-auth-workflow/dist

cp -r ./shared-auth/package.json ./example/node_modules/@brightlayer-ui/react-auth-shared/package.json
cp -r ./shared-auth/lib/. ./example/node_modules/@brightlayer-ui/react-auth-shared/lib
echo -e "${GREEN}Done${NC}"

echo -en "\r\n${BLUE}Linking Components: ${NC}"
if [ ! -f ./example/node_modules/@brightlayer-ui/react-auth-workflow/package.json ]; then echo -e "${BRED}Not Linked${NC}" && exit 1; fi
if [ ! -s ./example/node_modules/@brightlayer-ui/react-auth-workflow ];
    then
        if [ ! -f ./example/node_modules/@brightlayer-ui/react-auth-workflow/dist/index.js ];
        then echo -e "${BRED}Not Linked${NC}" && exit 1;
        fi;
fi

if [ ! -f ./example/node_modules/@brightlayer-ui/react-auth-shared/package.json ]; then echo -e "${BRED}Not Linked${NC}" && exit 1; fi
if [ ! -s ./example/node_modules/@brightlayer-ui/react-auth-shared ];
    then
        if [ ! -f ./example/node_modules/@brightlayer-ui/react-auth-shared/lib/commonjs/index.js ];
        then echo -e "${BRED}Not Linked${NC}" && exit 1;
        fi;
fi
echo -e "${GRAY}Complete${NC}\r\n"