const fs = require('fs')
const awsJwtPath = __dirname + '/../../aws-jwt-verify/dist/cjs'

/**
 * Open the file, find the from expression and replace it with the to value
 * @param {string} filePath - full path of file we are working with
 * @param {regex} from - regex to find the string we need to replace
 * @param {string} to - new value to put in place of the 'from' string
 */
function replaceInFile(filePath, from, to){
  const data = fs.readFileSync(filePath, 'utf8');  
  const result = data.replace(from, to);
  fs.writeFileSync(filePath, result);
}

/**
 * aws-jwt-verify uses subpath alias for some of the imports.  
 * Currently the build/transpile process does not support those
 * so we need to process the aliases on our own before building.
 * @returns null
 */
function fixJwtVerifyImports(){
  console.log("Attempting to fix imports in aws-jwt-verify.");
  if(fs.existsSync(awsJwtPath)){
    console.log("  Found aws-jwt-verify!")
  }else{
    console.log("  Could not find aws-jwt-verify. Exiting fixJwtVerifyImports!")
    return;
  }

  const options = {
    files: [
      `jwt-rsa.js`,
      `jwk.js`,
      `jwt.js`,
      `https.js`,
    ],
    from: /#node-web-compat/g,
    to: './node-web-compat-node.js'
  }

  try{
    for(const file of options.files){
      const filePath = `${awsJwtPath}/${file}`;
      console.log(`  Fixing imports in [${file}]`);
      replaceInFile(filePath, options.from, options.to);
    }
  }
  catch(error){
    console.error('Error occurred during file replacement:', error)
    return;
  }
  
  console.log("Imports Fixed. Done!");
}


module.exports = { fixJwtVerifyImports }