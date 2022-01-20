
function separaDias() {
    let dts = [];
    //Roda todos os eventos por dispositivo
    console.log(devs);
    for (let k = 0; k < devs.length; k++) {

        //Se Tiver Dispositivo com aquele numero entra
        if (devs[k] !== undefined) {


            //Roda todos os dispositivos
            for (let l = 0; l < devs[k].length; l++) {

                //Se tiver algum evento, passa a data dele
                if (devs[k][l] !== undefined) {
                    dt = new Date(devs[k][l].serverTime);
                    dt.setUTCHours(dt.getUTCHours() - 3)
                }

                if (dts[devs[k][l].deviceId] == undefined) {
                    dts[devs[k][l].deviceId] = [];

                    if (dts[devs[k][l].deviceId][dt.getDate()] == undefined) {
                        dts[devs[k][l].deviceId][dt.getDate()] = [];

                        if (dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId] === undefined) {
                            dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId] = [];
                            if (devs[k][l].type == "geofenceEnter") {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["E", dt, devs[k][l]];
                            } else {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["S", dt, devs[k][l]];
                            }



                        } else {
                            if (devs[k][l].type == "geofenceEnter") {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["E", dt, devs[k][l]];
                            } else {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["S", dt, devs[k][l]];
                            }
                        }

                    } else {
                        if (dts[devs[k][l].deviceId][devs[k][l].geofenceId][dt.getDate()] === undefined) {
                            dts[devs[k][l].deviceId][devs[k][l].geofenceId][dt.getDate()] = [];
                            if (devs[k][l].type == "geofenceEnter") {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["E", dt, devs[k][l]];
                            } else {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["S", dt, devs[k][l]];
                            }



                        } else {
                            if (devs[k][l].type == "geofenceEnter") {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["E", dt, devs[k][l]];
                            } else {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["S", dt, devs[k][l]];
                            }
                        }
                    }

                } else {
                    if (dts[devs[k][l].deviceId][dt.getDate()] == undefined) {
                        dts[devs[k][l].deviceId][dt.getDate()] = [];

                        if (dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId] === undefined) {
                            dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId] = [];
                            if (devs[k][l].type == "geofenceEnter") {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["E", dt, devs[k][l]];
                            } else {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["S", dt, devs[k][l]];
                            }



                        } else {
                            dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = devs[k][l];
                        }

                    } else {
                        if (dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId] === undefined) {
                            dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId] = [];
                            if (devs[k][l].type == "geofenceEnter") {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["E", dt, devs[k][l]];
                            } else {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["S", dt, devs[k][l]];
                            }



                        } else {
                            if (devs[k][l].type == "geofenceEnter") {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["E", dt, devs[k][l]];
                            } else {
                                dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId][dts[devs[k][l].deviceId][dt.getDate()][devs[k][l].geofenceId].length] = ["S", dt, devs[k][l]];
                            }
                        }
                    }
                }



            }
        }
    }

    return dts;

}

function separaDev(json) {

    let devs = [];
    for (let k = 0; k < json.length; k++) {

        if (json[k] !== undefined) {
            dev = json[k].deviceId;
        }

        if (devs[dev] == undefined) {
            devs[dev] = [];
            devs[dev][(devs[dev]).length] = json[k];
        } else {
            devs[dev][(devs[dev]).length] = json[k];
        }

    }

    return devs;
}