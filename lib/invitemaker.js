const fs = require('fs');
const distance = require('./distance');
const dublin_lat = 53.339428;   // as per requirement this package is specifically coded to find customers near dublin only
const dublin_lon = -6.257664;
let arr_data = [], invite_list = [];

module.exports.inviteList = function (fileoflist, callback) {
fs.readFile (fileoflist, 'utf8', (err, data) => { // read data from sample file
    let temp_lat, temp_lon, len;
    if (err) throw err;
    arr_data = data.toString().split('\n');
    arr_data.forEach(function(item, index) {
        arr_data[index] = JSON.parse(arr_data[index]);
        len = arr_data.length;
        temp_lat = Number(arr_data[index].latitude);// convert the string(coordinates into numeric type) 
        temp_lon = Number(arr_data[index].longitude);
        distance.dist_deg_cor(dublin_lat, dublin_lon, temp_lat, temp_lon)
        .then (function () { // promise is resolved when customer is eligible to be invited
                invite_list.push(arr_data[index]);
                if (index === len-1) {
                    arr_data = [];
                    sort_print(callback);
                }
        })
        .catch(function () { // promise is rejected when customer's distance is > 100 KM
            if (index === len-1) {
                arr_data = [];
                sort_print(callback);
            }
        });

    });
});
};
//Function  to sort the invitations based on userid
// then write the output to invite.txt file 
const sort_print = (callback) => {
    invite_list.sort(function(a, b) {
        return a.user_id - b.user_id;
    });
    fs.writeFile(
        './invite.txt',
        invite_list.map(function(v){ return JSON.stringify({"userid": v.user_id, "name": v.name}) }).join('\n'),
        function (err) { console.log(err ? 'Error :'+err : 'ok');
          callback(); }
   );
};
