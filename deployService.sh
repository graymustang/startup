
#!/bin/bash
set -e

while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployService.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying $service to $hostname\n"

# Step 1: Build React and package Express
printf "\n----> Building the application\n"

rm -rf build
mkdir -p build/public

npm install
npm run build

cp -rf dist/. build/public/
cp service/*.js build/
cp service/package.json build/
cp service/package-lock.json build/

# Step 2: Upload to AWS
printf "\n----> Uploading application to AWS\n"

ssh -i "$key" ubuntu@"$hostname" << ENDSSH
mkdir -p services/${service}
ENDSSH

scp -r -i "$key" build/. ubuntu@"$hostname":services/"$service"/

# Step 3: Install dependencies and restart
printf "\n----> Restarting backend service\n"

ssh -i "$key" ubuntu@"$hostname" << ENDSSH
export NVM_DIR="\$HOME/.nvm"
[ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
cd services/${service}
npm install
pm2 restart ${service}
ENDSSH

# Step 4: Clean up local build
printf "\n----> Cleaning up\n"

rm -rf build
rm -rf dist

printf "\n----> Deployment complete\n"
