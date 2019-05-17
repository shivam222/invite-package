const fs = require('fs');
const distance = require('./distance');
const dublin_lat = 53.339428;
const dublin_lon = -6.257664;
let arr_data = [], invite_list = [];

module.exports.inviteList = function (fileoflist) { 
    console.log(fileoflist);
fs.readFile (fileoflist, 'utf8', (err, data) => {
    let temp_lat, temp_lon, len;
    if (err) throw err;
    arr_data = data.toString().split('\n');
    arr_data.forEach(function(item, index) {
        arr_data[index] = JSON.parse(arr_data[index]);
        len = arr_data.length;
        temp_lat = Number(arr_data[index].latitude);
        temp_lon = Number(arr_data[index].longitude);
        distance.dist_deg_cor(dublin_lat, dublin_lon, temp_lat, temp_lon, index)
        .then (index => { // promise is resolved when customer is eligible to be invited
                // storing the data of customers to be invited
                // can not show it directly without saving in array 
                // requirement is that the list should be shown in sorted order of userid
                invite_list.push(arr_data[index]);
                if (index === len-1) {
                    arr_data = [];
                    sort_print();
                }
        })
        .catch(function (index) { // promise is rejected when customer's distance is > 100 KM
            if (index === len-1) {
                arr_data = [];
                sort_print();
            }
        });

    });
});
};
//Function  to sort the invitations based on userid
// then write the output to invite.txt file 
const sort_print = () => {
    invite_list.sort(function(a, b) { // sort the invitation list based on userid
        return a.user_id - b.user_id;
    });
    fs.writeFile(
        './invite.txt',
        invite_list.map(function(v){ return JSON.stringify({"userid": v.user_id, "name": v.name}) }).join('\n'),
        function (err) { console.log(err ? 'Error :'+err : 'ok') }
   );
};
