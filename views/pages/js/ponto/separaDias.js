function separaDias(json) {
    var dias = [];
    //For que roda o vetor completo
    for (let k = 0; k < json.length; k++) {
        //Dt do evento atual
        var dt = new Date(json[k].serverTime);
        //Retirada de fuso
        dt.setUTCHours(dt.getUTCHours() - 6);


        //Caso haja dados 
        if (json[k] !== undefined) {

            //Caso n haja  cadastro nesse mes
            if (dias[dt.getUTCMonth() + 1] === undefined) {
                dias[dt.getUTCMonth() + 1] = [];

                if (dias[dt.getUTCMonth() + 1][dt.getDate()] === undefined) {
                    dias[dt.getUTCMonth() + 1][dt.getDate()] = [];
                    //TYPE 1 === ENTRADA
                    if (json[k].type === "geofenceEnter") {
                        dias[dt.getUTCMonth() + 1][dt.getDate()][dias[dt.getUTCMonth() + 1][dt.getDate()].length] = {type: 1, data: dt, site: json[k].geofenceId};
                    } else {
                        dias[dt.getUTCMonth() + 1][dt.getDate()][dias[dt.getUTCMonth() + 1][dt.getDate()].length] = {type: 0, data: dt, site: json[k].geofenceId};
                    }
                } else {
                    if (json[k].type === "geofenceEnter") {
                        dias[dt.getUTCMonth() + 1][dt.getDate()][dias[dt.getUTCMonth() + 1][dt.getDate()].length] = {type: 1, data: dt, site: json[k].geofenceId};
                    } else {
                        dias[dt.getUTCMonth() + 1][dt.getDate()][dias[dt.getUTCMonth() + 1][dt.getDate()].length] = {type: 0, data: dt, site: json[k].geofenceId};
                    }
                }
            } else {
                if (dias[dt.getUTCMonth() + 1][dt.getDate()] === undefined) {
                    dias[dt.getUTCMonth() + 1][dt.getDate()] = [];
                    //TYPE 1 === ENTRADA
                    if (json[k].type === "geofenceEnter") {
                        dias[dt.getUTCMonth() + 1][dt.getDate()][dias[dt.getUTCMonth() + 1][dt.getDate()].length] = {type: 1, data: dt, site: json[k].geofenceId};
                    } else {
                        dias[dt.getUTCMonth() + 1][dt.getDate()][dias[dt.getUTCMonth() + 1][dt.getDate()].length] = {type: 0, data: dt, site: json[k].geofenceId};
                    }
                } else {
                    if (json[k].type === "geofenceEnter") {
                        dias[dt.getUTCMonth() + 1][dt.getDate()][dias[dt.getUTCMonth() + 1][dt.getDate()].length] = {type: 1, data: dt, site: json[k].geofenceId};
                    } else {
                        dias[dt.getUTCMonth() + 1][dt.getDate()][dias[dt.getUTCMonth() + 1][dt.getDate()].length] = {type: 0, data: dt, site: json[k].geofenceId};
                    }
                }
            }
        }
    }
    return dias;
}

function separaDiasAntigo() {
    let dts = [];
    //Roda todos os eventos por dispositivo
    for (let k = 0; k < devs.length; k++) {

        //Se Tiver Dispositivo com aquele numero entra
        if (devs[k] !== undefined) {


            //Roda todos os dispositivos
            for (let l = 0; l < devs[k].length; l++) {

                //Se tiver algum evento, passa a data dele
                if (devs[k][l] !== undefined) {
                    dt = new Date(devs[k][l].serverTime);
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

function separaDevAntigo() {

    let devs = [];
    for (let k = 0; k < jsonR.length; k++) {

        if (jsonR[k] !== undefined) {
            dev = jsonR[k].deviceId;
        }

        if (devs[dev] == undefined) {
            devs[dev] = [];
            devs[dev][(devs[dev]).length] = jsonR[k];
        } else {
            devs[dev][(devs[dev]).length] = jsonR[k];
        }

    }

    return devs;
}