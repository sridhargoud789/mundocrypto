/* eslint-disable */
// import node module libraries
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { proctoringinit } from "../../services/nodeapi";

const Proctoring = forwardRef((props, ref) => {
  const { startExam, userId, groupName, name, email, showLoading } = props;
  //const [_proctoringSession, setproctoringSession] = useState(null);
  // const [launchSuccessCallback, setlaunchSuccessCallback] = useState(null);
  //const [launchErrorCallback, setlaunchErrorCallback] = useState(null);

  const [mettlWindow, setmettlWindow] = useState(null);
  var _proctoringSession;
  const [isStarted, setIsStarted] = useState(false);
  const [gName, setGName] = useState("");
  useEffect(() => {}, []);
  //var _proctoringSession;
  useImperativeHandle(ref, () => ({
    log(d) {
      if (d === "start") {
        pageLoad();
      } else {
        stopProctoring();
      }
    },
  }));
  const pageLoad = async () => {
    const _gName = groupName; //name.replace(/\s/g, "") + "_" + email + "_" + moment().format("D-MMM-YY-H-mm-ss");
    setGName(_gName);

    const resp = await proctoringinit({
      userId,
      groupName: _gName,
      name,
      email,
    });
    const token = resp.data.token;
    MP.launch(token, launchSuccessCallbackMethod, launchFailureCallback);
  };

  var proctoringSession;
  function launchSuccessCallbackMethod(procSession) {
    proctoringSession = procSession;
    startProctoring();
    showLoading(false);
    startExam(true);
  }
  function launchFailureCallback(error) {
    console.log(error);
  }
  function startProctoring() {
    proctoringSession.start();
  }
  function stopProctoring() {
    proctoringSession.stop();
  }
  function handleError(errObj) {
    console.log("Error: ", errObj);
  }
  function setErrorListener() {
    proctoringSession.setErrorListener(handleError);
  }
  window.addEventListener("message", handleMessage, false);

  var EventType = Object.freeze({
    KEEP_ALIVE: "keep_alive",
    KEEP_ALIVE_ACK: "keep_alive_ack",
    START: "start",
    STOP: "stop",
    CHAT: "MESSAGE",
    DIAGONISTIC_SUCCESS: "diagonistic_success",
    DIAGONISTIC_FAILED: "diagonistic_failed",
    ANNOUNCEMENT: "ANNOUNCEMENT",
    CAMERA_UNAVAILABLE: "CAMERA_UNAVAILABLE",
    SCREEN_UNAVAILABLE: "SCREEN_UNAVAILABLE",
    WEB_SOCKET_DISCONNECTION: "WEB_SOCKET_DISCONNECTION",
    CANDIDATE_BLUR_OUT: "CANDIDATE_BLUR_OUT",
    CANDIDATE_BLUR_IN: "CANDIDATE_BLUR_IN",
    LOG_NAVIGATE_AWAY_EVENT: "LOG_NAVIGATE_AWAY_EVENT",
    MICROPHONE_MUTED: "MICROPHONE_MUTED",
    MICROPHONE_UNMUTED: "MICROPHONE_UNMUTED",
    MICROPHONE_UNAVAILABLE: "MICROPHONE_UNAVAILABLE",
    DIAGONISTIC_CLOSED: "DIAGONISTIC_CLOSED",
  });

  var MpaasConstants = Object.freeze({
    KEEP_ALIVE_INTERVAL: 5000,
    KEEP_ALIVE_ACK_CHECK_INTERVAL: 15000,
    KEEP_ALIVE_ACK_TIMEOUT: 15000,
  });

  var RecieverKeepAliveType = Object.freeze({
    sendKeepAliveToDiagonistic: "sendKeepAliveToDiagonistic",
    checkLastAckTime: "checkLastAckTime",
  });

  var TYPE = "type",
    DATA = "data",
    ID = "id",
    TIME = "time",
    ID = "id";

  var mpsServerUrl = "https://mpaas-api.mettl.com";

  // if (conf && conf.getMpsServerUrl()) {
  //   mpsServerUrl = conf.getMpsServerUrl();
  // }

  console.log("mps server url: ", mpsServerUrl);

  var launchSuccessCallback, launchErrorCallback;
  var keepAliveId = 1;
  var lastAckTime;
  var keepAliveWorker;
  var isAudioMic = false;

  function handleMessage(event) {
    if (!event || !event.data) {
      return;
    }

    var data = event.data;
    console.log("received message " + JSON.stringify(event.data));

    switch (data.type) {
      case EventType.DIAGONISTIC_SUCCESS:
        launchSuccessCallbackMethod(proctoringSession);
        break;
      case EventType.DIAGONISTIC_FAILED:
        launchFailureCallback(data[DATA]);
        break;
      case EventType.CHAT:
      case EventType.ANNOUNCEMENT:
        if (typeof proctoringSession.getMessageListener() == "function") {
          proctoringSession.getMessageListener()(data);
        } else {
          console.log("Invalid argument for message listener.");
        }
        break;
      case EventType.KEEP_ALIVE_ACK:
        lastAckTime = Date.now();
        break;
      case EventType.MICROPHONE_MUTED:
        micMuted();
        if (typeof proctoringSession.getErrorListener() == "function") {
          proctoringSession.getErrorListener()(data);
        } else {
          console.log("Invalid argument for error listener.");
        }
        break;
      case EventType.MICROPHONE_UNMUTED:
        micUnmuted();
        if (typeof proctoringSession.getErrorListener() == "function") {
          proctoringSession.getErrorListener()(data);
        } else {
          console.log("Invalid argument for error listener.");
        }
        break;
      case EventType.CAMERA_UNAVAILABLE:
      case EventType.SCREEN_UNAVAILABLE:
      case EventType.WEB_SOCKET_DISCONNECTION:
      case EventType.MICROPHONE_UNAVAILABLE:
        if (typeof proctoringSession.getErrorListener() == "function") {
          proctoringSession.getErrorListener()(data);
        } else {
          console.log("Invalid argument for error listener.");
        }
        break;
      case EventType.CANDIDATE_BLUR_OUT:
        proctoringSession.candidateBlurOut();
        break;
      case EventType.CANDIDATE_BLUR_IN:
        proctoringSession.candidateBlurIn();
        break;
      case EventType.LOG_NAVIGATE_AWAY_EVENT:
        proctoringSession.logNavigateAwayEvent(data);
        break;
      default:
        console.log("Received wrong event type");
    }
  }

  function micMuted() {
    if (isAudioMic) {
      return;
    }
    isAudioMic = true;
    var message = {
      type: "MIC_MUTE",
      time: new Date().getTime(),
    };
    console.log("message", message);
    proctoringSession.audioData(message);
  }

  function micUnmuted() {
    if (isAudioMic) {
      var message = {
        type: "MIC_UNMUTE",
        time: new Date().getTime(),
      };

      console.log("message", message);
      proctoringSession.audioData(message);
      isAudioMic = false;
    } else {
      console.log("Mic is unmuted");
    }
  }

  var proctoringSession = new (function () {
    var eventListener, messageListener, errorListener;
    var alreadyStarted = false;
    var userStoppedProctoring = false;

    function start() {
      if (alreadyStarted) return;
      var message = new Object();
      message[TYPE] = EventType.START;
      MP.sendPostMessage(message);
      startPingPong();
      alreadyStarted = true;
    }

    function stop() {
      if (userStoppedProctoring) return;
      var message = new Object();
      message[TYPE] = EventType.STOP;
      MP.sendPostMessage(message);
      stopPingPong();
      userStoppedProctoring = true;
    }

    function setEventListener(eL) {
      eventListener = eL;
    }

    function getEventListener() {
      return eventListener;
    }

    function setMessageListener(mL) {
      messageListener = mL;
    }

    function getMessageListener() {
      return messageListener;
    }

    function setErrorListener(errL) {
      errorListener = errL;
    }

    function getErrorListener() {
      return errorListener;
    }

    function sendMessage(chat) {
      var message = {};
      message[TYPE] = EventType.CHAT;
      message[DATA] = chat;
      MP.sendPostMessage(message);
    }

    function audioData(data) {
      MP.sendPostMessage(data);
    }
    function candidateBlurOut() {
      var message = {};
      message[TYPE] = EventType.CANDIDATE_BLUR_OUT;
      MP.sendPostMessage(message);
    }

    function candidateBlurIn() {
      var message = {};
      message[TYPE] = EventType.CANDIDATE_BLUR_IN;
      MP.sendPostMessage(message);
    }

    function logNavigateAwayEvent(navigateTime) {
      var message = {};
      message[TYPE] = EventType.LOG_NAVIGATE_AWAY_EVENT;
      message[TIME] = navigateTime.time;
      MP.sendPostMessage(message);
    }

    function keepAlive() {
      var pingIntervalId, pingAckIntervalId;
      var KeepAliveConstants = Object.freeze({
        KEEP_ALIVE_INTERVAL: 5000,
        KEEP_ALIVE_ACK_CHECK_INTERVAL: 15000,
      });

      var SenderKeepAliveType = Object.freeze({
        sendKeepAliveToDiagonistic: "sendKeepAliveToDiagonistic",
        checkLastAckTime: "checkLastAckTime",
      });

      function startTracker() {
        pingIntervalId = setInterval(function () {
          self.postMessage(SenderKeepAliveType.sendKeepAliveToDiagonistic);
        }, KeepAliveConstants.KEEP_ALIVE_INTERVAL);

        pingAckIntervalId = setInterval(function () {
          self.postMessage(SenderKeepAliveType.checkLastAckTime);
        }, KeepAliveConstants.KEEP_ALIVE_ACK_CHECK_INTERVAL);
      }

      function stopTracker() {
        if (pingIntervalId) {
          clearInterval(pingIntervalId);
        }

        if (pingAckIntervalId) {
          clearInterval(pingAckIntervalId);
        }
      }

      self.addEventListener(
        "message",
        function (e) {
          switch (e.data) {
            case "start":
              startTracker();
              break;
            case "stop":
              stopTracker();
              break;
          }
        },
        false
      );
    }

    function startPingPong() {
      if (typeof Worker !== "undefined") {
        var keepAliveBody = keepAlive
          .toString()
          .replace(/^[^{]*{\s*/, "")
          .replace(/\s*}[^}]*$/, "");
        keepAliveWorker = new Worker(
          URL.createObjectURL(
            new Blob([keepAliveBody], { type: "text/javascript" })
          )
        );

        keepAliveWorker.addEventListener(
          "message",
          function (event) {
            const _aliveType = event.data;
            console.log("getWorker message type", _aliveType);

            switch (_aliveType) {
              case RecieverKeepAliveType.sendKeepAliveToDiagonistic:
                sendKeepAliveToDiagonistic();
                break;
              case RecieverKeepAliveType.checkLastAckTime:
                checkLastAckTime();
                break;
            }
          },
          false
        );

        keepAliveWorker.postMessage("start");
      } else {
        console.error("Sorry, your browser does not support Web Workers...");
        console.log("Sorry, your browser does not support Web Workers...");
      }
    }

    function stopPingPong() {
      try {
        keepAliveWorker.postMessage("stop");
        keepAliveWorker.terminate();
      } catch (e) {
        console.log(e);
      }
    }

    function checkLastAckTime() {
      var currentTime = Date.now();
      var diff = currentTime - lastAckTime;
      if (isNaN(diff) && keepAliveId > 5) {
        WindowClose();
        console.log("Connection lost", keepAliveId);
      }
      console.log(
        "last message from SecureProctor received  " + diff + " ms ago"
      );
      if (diff > MpaasConstants.KEEP_ALIVE_ACK_TIMEOUT) {
        if (!userStoppedProctoring) {
          alreadyStarted = false;
          WindowClose();
          console.log("Connection with SecureProctor lost");
        }
        stopPingPong();
      }
    }

    function WindowClose() {
      var message = {};
      message[TYPE] = EventType.DIAGONISTIC_CLOSED;
      MP.sendPostMessage(message);
    }

    function sendKeepAliveToDiagonistic() {
      var message = {};
      message[TYPE] = EventType.KEEP_ALIVE;
      message[TIME] = Date.now();
      message[ID] = keepAliveId;
      keepAliveId++;
      MP.sendPostMessage(message);
    }

    return {
      start: start,
      stop: stop,
      setEventListener: setEventListener,
      getEventListener: getEventListener,
      setMessageListener: setMessageListener,
      getMessageListener: getMessageListener,
      setErrorListener: setErrorListener,
      getErrorListener: getErrorListener,
      sendMessage: sendMessage,
      startPingPong: startPingPong,
      audioData: audioData,
      candidateBlurOut: candidateBlurOut,
      candidateBlurIn: candidateBlurIn,
      logNavigateAwayEvent: logNavigateAwayEvent,
    };
  })();
  var __mettlWindow;

  var MP = new (function () {
    function launch(token, successCallback, errorCallback) {
      var params = {
        token: token,
      };
      var form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute("action", mpsServerUrl + "/proctoring");
      form.setAttribute("target", window.location.origin);
      for (var i in params) {
        if (params.hasOwnProperty(i)) {
          var input = document.createElement("input");
          input.type = "hidden";
          input.name = i;
          input.value = params[i];
          form.appendChild(input);
        }
      }
      document.body.appendChild(form);
      const _mettlWindow = window.open(
        mpsServerUrl + "/proctoring",
        window.location.origin
      );

      setmettlWindow(_mettlWindow);
      __mettlWindow = _mettlWindow;

      form.submit();
      document.body.removeChild(form);

      launchSuccessCallback = launchSuccessCallbackMethod;
      launchErrorCallback = launchFailureCallback;
      //$(mettlWindow).ready(function () {});
    }

    function sendPostMessage(message) {
      console.log("sending message " + JSON.stringify(message));
      try {
        __mettlWindow.postMessage(message, mpsServerUrl);
      } catch (e) {
        console.log(e);
      }
      try {
        mettlWindow.postMessage(message, mpsServerUrl);
      } catch (e) {
        console.log(e);
      }
    }

    function syncParent() {
      console.log("syncParent called of MP");
    }

    return {
      launch: launch,
      sendPostMessage: sendPostMessage,
      syncParent: syncParent,
    };
  })();
  return <>{/* <Button onClick={handleStop}>stop proc</Button> */}</>;
});

export default Proctoring;
