
module.exports.dist_deg_cor = function (src_lat, src_lon, temp_lat, temp_lon, index) { 
    return new Promise(function(resolve, reject) { 
        const R = 6371; // Radius of earth in KM 
        const dLat = toRad(temp_lat-src_lat);
        const dLon = toRad(temp_lon-src_lon); 
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(toRad(src_lat)) * Math.cos(toRad(temp_lat)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const d = R * c;
        if (d <= 100) {
            resolve(index);
        } else {
            reject(index);
        }
      }); 
};

function toRad(Value) {
    return Value * Math.PI / 180;
}