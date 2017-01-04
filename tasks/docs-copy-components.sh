#!/usr/bin/env bash

# copy docs from all component folders into the dist directory, and create a json file enumerating the component names
# e.g. from: src/components/button/docs
#        to: dist/docs/components/button/docs
# also copy regular docs 'pages' from docs/src/pages to dist/docs/pages

# read the version from package.json
version=$(cat package.json | grep -oE "\"version\":.*" | sed -e 's/\"version\": \"//g' -e 's/\".//g')

# setup the docs folder and json so we can reference them immediately
mkdir -p dist/docs

docsjsonfile="dist/docs/docs.json"
touch $docsjsonfile

# find all docs folders under the src folder, then loop over them
srcdirs=$(find src -type d -name "docs")

# create the json file
echo "{" >> $docsjsonfile
echo "  \"version\": \"${version}\"," >> $docsjsonfile
echo "  \"components\": [" >> $docsjsonfile

i=0
while read -r srcdir
do
  # trim the match from find to get the component name
  component=$(echo "$srcdir" | sed 's/src\/components\///' | sed 's/\/docs$//')

  echo "docs copied for component: $component"

  # create docs folder to copy into
  mkdir -p "dist/docs/$component"

  # copy docs from src
  cp "src/components/$component/docs"/* "dist/docs/$component"

  # put the component name into the json file.  No trailing comma if last array entry
  if [ "$i" -eq $((${#components[@]} - 1)) ]
  then
    echo "    \"$component\"" >> $docsjsonfile
  else
    echo "    \"$component\"," >> $docsjsonfile
  fi

  # increment counter manually because we used a while loop
  i=$((i+1))
  lastComponent="$component"
done <<< "$srcdirs"

echo "  ]" >> $docsjsonfile
echo "}" >> $docsjsonfile

# remove trailing comma from last component name, otherwise not valid JSON
sed -i .bak "s/\"$lastComponent\",/\"$lastComponent\"/" $docsjsonfile

# cleanup .bak file
rm $docsjsonfile.bak

# copy the main HTML file for the docs site
cp docs/index.html dist/docs

cp -R docs/src/pages dist/docs/pages
