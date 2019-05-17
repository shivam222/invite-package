# biz2credit-shivam-bansal

https://www.npmjs.com/package/biz2credit-shivam-bansal


### Package Usage
````
npm install biz2credit-shivam-bansal
Or install it directly from my git repo using:
npm install git+https://git@github.com/shivam222/invite-package.git
```

Git Repo: 
```
https://github.com/shivam222/invite-package
```

How to use:
```
Install the package using any one of the above mentioned commands.
Import the package in your code file using - const invitemaker = require('biz2credit-shivam-bansal').invitemaker;
Then call  the function "inviteList" that is exported from invitemaker module as follows: 
invitemaker.inviteList('SampleFile', function () {
	// code
});
replace "SampleFile" by relative path of the sample file that contains list of customers
on successful run you will find a "invite.txt" file in your root directory(this file contains the result)
```

How it works:
```
Entry level file of the package is index.js, this file exports two modules- "invitemaker" and "distance" 
invitemaker module extract the data from the sample file supplied as argument and then find each customer's distance from dublin using the "distance module"
if distance is less than 100KM than it is added to the final list.
at last the list is sorted based on user_id and an invite.txt file is created in the root directory of the project

Distance module can also be used alone to check if the distance between two coordinates is less than 100KM or not by resolving or rejecting the promise resp.Usage-
const distance = require('biz2credit-shivam-bansal').distance;
distance.dist_deg_cor(latitude1, longitude1, latitude2, longitude2)
.then(function(){})
.catch(function(){});

```
### Hope You Like It.