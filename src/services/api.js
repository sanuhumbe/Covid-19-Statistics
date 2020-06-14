const Sevice = {
  // deviceList: function(params) {
  //   return fetch("https://159.65.159.240/api/listdevices", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       ssid: params.ssid,
  //       ScopeID: params.ScopeID
  //     })
  //   });
  // },
  //   delDevice: function (params) {
  //     return fetch("https://159.65.159.240/api/deldevice", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(params),
  //     });
  //   },
  worldometer: function (params) {
    return fetch(
      "https://api.apify.com/v2/key-value-stores/SmuuI0oebnTWjRTUh/records/LATEST?disableRedirect=true",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: params,
      }
    );
  },
  // abbreviation: function (params) {
  //   return fetch(
  //     "https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json",
  //     {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: params,
  //     }
  //   );
  // },
};

export default Sevice;
