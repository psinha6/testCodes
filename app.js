"use strict";

/**
 * Module dependencies.
 */
var http = require('http')
  , path = require('path')
  , express = require('express')
  , bodyParser = require('body-parser')  
  , app = express()
  , childProcess = require('child_process')
  , fs = require('fs');
;
// Remote 
var r = require("./remote_socket_io.js");
var remote = require("./remote_server.js");

var options = {
  host: 'localhost',
  port: 2324
};
// Remote 
var io = r.io;
var app = r.app;
r.getClient();

var gui = require('nw.gui');
var win = gui.Window.get();
// Removing for NextTools
//win.enterKioskMode();

//Commands 
var commands = gui.App.argv;

var folderLoc = 'public';
if(folderLoc){
	folderLoc += '';
}
for (var i in commands) {
	console.log("Entered command 1")
}
//check if server is already running
http.get(options, function(res) {
	win.enterKioskMode();
  console.log('server is running, redirecting to localhost');
  if (window.location.href.indexOf('localhost') < 0) { 
    window.location = 'http://localhost:' + app.get('port');
  }
}).on('error', function(e) {
  //server is not yet running
startServer();
win.enterKioskMode();
  // all environments
  app.set('port', process.env.PORT || 2324);
  /*app.set('views', process.cwd() + '/views');
  app.set('view engine', 'jade');*/
  app.use(require('stylus').middleware(path.join(process.cwd(), folderLoc)));
  app.use(express.static(path.join(process.cwd(), folderLoc)));
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  //app.get('/', routes.index);
  app.get('/', function(req, resp){
	resp.sendfile('./' + folderLoc + '/index.html');
  });

  app.get('/minimize', function(req, resp){
	  win.minimize();
	  resp.send("Success");
  });
  app.get('/maximize', function(req, resp){
	  win.maximize();
	  resp.send("Success");
  });
  app.get('/hide', function(req, resp){
	  win.hide();
	  resp.send("Success");
  });
  app.get('/reload', function(req, resp){
	  win.reload();
	  resp.send("Success");
  });
  app.get('/show', function(req, resp){
	  win.show();
	  resp.send("Success");
  });
  app.get('/focus', function(req, resp){
	  win.focus();
	  resp.send("Success");
  });
  app.get('/try', function(req, resp){
	  win.hide();
	  win.show();
	  resp.send("Try :: Success");
  });
  app.get('/makeAsIcon', function(req,resp){
	  	var width = 100, height = 100;
		alert("make as icon ");
		win.leaveKioskMode();
		win.resizeTo(Number(width), Number(height));	
		win.moveTo(0, 1000);
		resp.send("makeAsIcon :: Success");
  });
  
  app.get('/makeFullscreen', function(req,resp){
	  	var width = 100, height = 100;
		alert("make as icon ");
		win.enterKioskMode();
		win.resizeTo(Number(width), Number(height));	
		win.moveTo(0, 100);
		resp.send("makeFullscreen :: Success");
  });
  
  app.get('/takeScreenShot', function(req,resp){
		win.capturePage(function(buffer){
			require('fs').writeFile('screenshot.png', buffer, function (err) {
				if (err) throw err;
				console.log('It\'s saved!');
			});
			resp.send(buffer);
		}, { format : 'png', datatype : 'buffer'} );
  });
  app.get('/takeFullScreenShot', function(req,resp){
		screencapture('output.png', function (err, imagePath) {
			if (err) throw err;
			fs.readFile(imagePath, function(err, data) {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.end(data); // Send the file data to the browser.
			});
		})
  });

  app.get('/launchTools', function(req, resp){
		var command;
		if(process.platform == 'win32'){
			command = "C:\\NextEdu\\Templates\\Template.exe";
		} else {
			command = "/tn/V2apps/TemplatesV2/Template";
		}
		childProcess.exec(command, function (err, stdout, stderr) {
			if (err) {
				console.error("error::" + err);
				resp.status(400).send({data: err});
				return;
			}
			resp.status(200).send({data: 'true'});
			console.log(stdout);
		//	childProcess.exit(0);// exit process once it is opened
		});
  });

  app.get('/launchStudio', function(req, resp){
		var command;
		if(process.platform == 'win32'){
			command = "C:\\NextEdu\\Templates\\Template.exe";
		} else {
			command = "/tn/V2apps/NextStudioV2/nw";
		}
		childProcess.exec(command, function (err, stdout, stderr) {
			if (err) {
				console.error("error::" + err);
				resp.status(400).send({data: err});
				return;
			}
			resp.status(200).send({data: 'true'});
			console.log(stdout);
		//	childProcess.exit(0);// exit process once it is opened
		});
  });
  function startServer(){
                var command;
                if(process.platform == 'win32'){
                        command = "C:\\NextEdu\\Templates\\Template.exe";
                } else {
                        command = "/root/SimpleServer";
                }
                childProcess.exec(command, function (err, stdout, stderr) {
                        if (err) {
				console.log("Unable to start the Server");
                                return 0;
                        }
                        console.log(stdout);
                });
  }
app.get('/fetchMountedMedia', function (req, resp) {
    var dataObject = req.query;
    if (!dataObject || !dataObject.time) {
      resp.status(500).send({
        data: 'Please provide valid time param'
      });
      return;
    }
    var command = '/tn/bin/mountedMedia.sh ' + dataObject.time;
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        stdout
      })
    });
  });

  app.post('/listFiles', function (req, resp) {
    var dataObject = req.body;
    var dataObject = JSON.parse(Object.keys(dataObject));
    if (!dataObject || !dataObject.folder) {
      resp.status(500).send({
        data: 'Please provide valid time param'
      });
      return;
    }
    var command = 'ls "' + dataObject.folder + '"';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });
app.post('/launchExternalApp', function (req, resp) {
    var dataObject = req.body;
    dataObject = JSON.parse(Object.keys(dataObject));
    if (!dataObject || !dataObject.launchCmd) {
      resp.status(500).send({
        data: 'Please provide valid time param'
      });
      return;
    }
    var command = 'su - activuser -c \"' + dataObject.launchCmd + '" &';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });
app.post('/loadFileList', function (req, resp) {
    var dataObject = req.body;
    var dataObject = JSON.parse(Object.keys(dataObject));
    if (!dataObject || !dataObject.folder) {
      resp.status(500).send({
        data: 'Please provide valid folder name'
      });
      return;
    }
    var command = 'ls -lQ "' + dataObject.folder + '"';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

  app.get('/getRemoteServerURL', function (req, resp) {
    var dataObject = req.query;
    if (!dataObject || !dataObject.url) {
      resp.status(500).send({
        data: 'Please provide valid URL'
      });
      return;
    }
    var fileLoc = '/tnuserdata/school/remoteserver.txt';
    fs.readFile(fileLoc, function (err, data) {
      if (err) {
        console.log(err);
        resp.status(500).send({
          data: err
        })
        return err;
      }
      resp.status(200).send({
        data: data
      })
      console.log("getRemoteServerURL success");
    });
  });
  app.get('/getAvailableResolutions', function (req, resp) {
    
    var command = '/tn/bin/getavailableresolutions.sh';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
alert(JSON.stringify(stdout));
var out = stdout;
      resp.status(200).send({
        out
      })
    });
  });

  app.get('/getResolution', function (req, resp) {
    
    var command = '/tn/bin/getResolution.sh';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });
  
  app.get('/setResolution', function (req, resp) {

    var dataObject = req.query;
    if (!dataObject || !dataObject.resolution) {
      resp.status(500).send({
        data: 'Please provide valid name'
      });
      return;
    }

    var command = 'xrandr -s ' + dataObject.resolution;
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

  app.get('/setDefaultResolution', function (req, resp) {

    var dataObject = req.query;
    if (!dataObject || !dataObject.resolution) {
      resp.status(500).send({
        data: 'Please provide valid resolution'
      });
      return;
    }

    var command = '/tn/bin/setdefaultresolution.sh ' + dataObject.resolution;
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

  app.get('/getVersionInfo', function (req, resp) {
    var fileLoc = "/tnuserdata/version"
    fs.readFile(fileLoc, function (err, data) {
      if (err) {
        console.log(err);
        resp.status(500).send({
          data: err
        })
        return err;
      }
      resp.status(200).send({
        data: data
      })
      console.log("getVersionInfo success");
    });
  });

  app.get('/listCollectedBoxes', function (req, resp) {
    
    var command = '/tn/bin/listbox.sh';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

  app.get('/checkCalibrationDevice', function (req, resp) {
    
    var command = '/tn/bin/getcalibrationdevice.sh';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

  app.get('/invokeCalibrate', function (req, resp) {
    
    var command = '/tn/bin/invokeCalibrate.sh';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

  app.get('/invokeDetailCalibrate', function (req, resp) {
    
    var command = '/tn/bin/invokeDetailCalibrate.sh';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

  app.get('/cancelCalibration', function (req, resp) {
    
    var command = '/tn/bin/killcalibration.sh';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err || stdout == 0) {
        console.error("error::" + err || stdout);
        resp.status(500).send({
          data: 'failure'
        });
        return;
      }
      resp.status(200).send({
        data: 'success'
      })
    });
  });

  app.get('/invokeInspire', function (req, resp) {

    var command = 'sudo -iu activuser inspire &';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err || stdout == 0) {
        console.error("error::" + err || stdout);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });
  app.get('/killInspire', function (req, resp) {

    var command = '/tn/bin/killinspire.sh';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err || stdout == 0) {
        console.error("error::" + err || stdout);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

  app.get('/toggleBoxFlag', function (req, resp) {

    var command = '/tn/bin/changelink.sh';
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err || stdout == 0) {
        console.error("error::" + err || stdout);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

  app.get('/listCollectedBoxes', function (req, resp) {
    var dataObject = req.query;
    if (!dataObject || !dataObject.name) {
      resp.status(500).send({
        data: 'Please provide valid name'
      });
      return;
    }
    var command = '/tn/bin/listbox.sh' + dataObject.name;
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err || stdout == 0) {
        console.error("error::" + err || stdout);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

  app.get('/listCollectedBoxes', function (req, resp) {
    var dataObject = req.query;
    if (!dataObject || !dataObject.name) {
      resp.status(500).send({
        data: 'Please provide valid name'
      });
      return;
    }
    var command = '/tn/bin/listbox.sh' + dataObject.name;
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err || stdout == 0) {
        console.error("error::" + err || stdout);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

  app.get('/launchAlgodoo', function (req, resp) {
    var dataObject = req.query;
    var command;
    if (!dataObject || !dataObject.name) {
      command = 'sudo -iu activuser /opt/Algodoo/algodoo &';
    } else {
      command = 'sudo -iu activuser /opt/Algodoo/algodoo ' + dataObject.name + ' &';
    }
    
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err || stdout == 0) {
        console.error("error::" + err || stdout);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

app.get('/getProjectorSettings', function (req, resp) {
    var dataObject = req.query;
   
    var fileLoc = '/tnuserdata/school/projectorSettings.txt';
    fs.readFile(fileLoc,function (err) {
      if (err) {
        console.log(err);
        resp.status(500).send({
          data: err
        })
        return err;
      }
      resp.status(200).send({
        data: 'sucess'
      })
      console.log("getProjectorSettings success");
    });
  });

app.get('/setResolution', function (req, resp) {

    var dataObject = req.query;
    if (!dataObject || !dataObject.resolution) {
      resp.status(500).send({
        data: 'Please provide valid name'
      });
      return;
    }

    var command = 'xrandr -s ' + dataObject.resolution;
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });

  app.get('/setDefaultResolution', function (req, resp) {

    var dataObject = req.query;
    if (!dataObject || !dataObject.resolution) {

	resp.status(500).send({
        data: 'Please provide valid name'
      });
      return;
    }

    var command = '/tn/bin/setdefaultresolution.sh ' + dataObject.resolution;
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err);
        resp.status(500).send({
          data: err--
        });
        return;
      }
      resp.status(200).send({
        data: stdout
      })
    });
  });
  app.get('/getProjectorData', function (req, resp) {
    var dataObject = req.query;
    if (!dataObject || !dataObject.url) {
      resp.status(500).send({
        data: 'Please provide valid URL'
      });
      return;
    }
    var fileLoc = '/tnuserdata/school/projectorSettings.txt';
    fs.readFile(fileLoc, function (err, data) {
      if (err) {
        console.log(err);
        resp.status(500).send({
          data: err
        })
        return err;
      }
      resp.status(200).send({
        data: data
      })
      console.log("getProjectorSettings success");
    });
  });
  app.get('/setProjectorSettings', function (req, resp) {
    var dataObject = req.query;
    if (!dataObject || !dataObject.groupname && !dataObject.ctlchkbox &&
      !dataObject.lampMode && !dataObject.timeout) {
      resp.status(500).send({
        data: 'Please provide valid parameters'
      });
      return;
    }
    var projectorData = dataObject.groupname + ',' + dataObject.ctlchkbox + 
      ',' + dataObject.lampMode + ',' + dataObject.timeout;
    var location = '/tnuserdata/school/projectorSettings.txt';
 alert(projectorData);
    writeFile(projectorData, location).then(
      response => {
          var command = '/tn/bin/setLampMode.sh';
          executeCommand(command).then(
            resp => {
              console.log("No error ");
              resp.status(200).send({
                data: '0'
              })
            },
            err => {
              console.log("error in executing command ");
               alert("error in executing command "+ err);
              resp.status(500).send({
                data: '-1'
              });
            }
          );
      },
      err => {
        console.log("error in writing to file ");
         alert("error in writing to file ");
        resp.status(500).send({
          data: '-1'
        });
      }
    );
  });

app.get('/closeWithoutShutdown', function (req, resp) {
win.close(true);    
// process.exit(0);
//	resp.status(200).send({data:'success'});
  });

app.get('/get_fact', function (req, res) {

   var output = remote.getFact(req.query.fact);//fxn parameter is the fact attribute of request query
   console.log(output);
   response = {
      number:req.query.fact,
      factorial:output
   };
   console.log(response);
   res.end(JSON.stringify(response));//ends the response
})

app.get('/test', function(req, res) {
    console.log("serving the file");
    res.sendFile('test.html', {root: __dirname});//sends test.html from the given path i.e. opens test.html
});

remote.initialize_remote();
remote.registerCallback('5','Release',function(){
	console.log("serverside remote callback");
})
  http.createServer(app).listen(app.get('port'), function(err){
    console.log('server created');
    if (window.location.href.indexOf('localhost') < 0) { 
      window.location = 'http://localhost:' + app.get('port');
    }
  });
});
	
// Common functions
function executeCommand(command) {
  return new Promise(function (resolve, reject) {
    childProcess.exec(command, function (err, stdout, stderr) {
      if (err) {
        console.error("error::" + err || stderr);
        reject(err);
      }
      resolve(stdout);
    });
  });
}

function readFile(fileLoc) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileLoc, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
}

function writeFile(fileLoc, location) {
alert(fileLoc + "::: " + location);
  return new Promise(function (resolve, reject) {
    fs.writeFile(fileLoc, location, function (err) {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve('saved')
    });
  });

}
