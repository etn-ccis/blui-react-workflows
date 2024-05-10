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

echo -e "${BLUE}Building workflow package...${NC}"
yarn build

echo -en "${BLUE}Creating new folder in node_modules...${NC}"
rm -rf "./example-vite/node_modules/.cache"
rm -rf "./example-vite/node_modules/@brightlayer-ui/react-auth-workflow"
mkdir -p "./example-vite/node_modules/@brightlayer-ui/react-auth-workflow"

echo -en "${BLUE}Copying build output into node_modules...${NC}";
cp -r ./package.json ./example-vite/node_modules/@brightlayer-ui/react-auth-workflow/package.json
cp -r ./dist/. ./example-vite/node_modules/@brightlayer-ui/react-auth-workflow/dist

echo -en "\r\n${BLUE}Linking Components: ${NC}"
if [ ! -f ./example-vite/node_modules/@brightlayer-ui/react-auth-workflow/package.json ]; then echo -e "${BRED}Not Linked${NC}" && exit 1; fi
if [ ! -s ./example-vite/node_modules/@brightlayer-ui/react-auth-workflow ];
    then
        if [ ! -f ./example-vite/node_modules/@brightlayer-ui/react-auth-workflow/dist/index.js ];
        then echo -e "${BRED}Not Linked${NC}" && exit 1;
        fi;
fi
echo -e "${GRAY}Complete${NC}\r\n"