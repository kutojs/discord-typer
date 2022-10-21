var channels = [];
var typing = false;
var interval;

function type() {
  for (let i = 0; i < channels.length; i++) {
    if (typing) {
      fetch(`https://discord.com/api/v9/channels/${channels[i]}/typing`, {
        method: "POST",
        headers: {
          authorization: document.getElementById("cookie-input").value,
          "sec-fetch-site": "cross-origin",
        },
        referrer: "https://kuto.dev/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
      });
    }
  }
}

function addchannel() {
  let cookie = document.getElementById("cookie-input").value;
  let channel = document.getElementById("channel-input").value;
  let li = document.createElement("li");
  li.innerHTML = `<p style="margin:3px 0;">${channel}</p><button onclick="removechannel(this)" style="margin: 0; padding: 0.3em 1.2em;">X</button>`;
  document.getElementById("channels").appendChild(li);
  document.getElementById("channel-input").value = "";
  channels.push(channel);
  console.log(channels);
}

function removechannel(button) {
  button.parentNode.remove();
  channels.splice(
    channels.indexOf(button.parentNode.firstChild.textContent),
    1
  );
  console.log(channels);
}

function starttyping() {
  typing = true;
  document.getElementById("typing").innerHTML = "status: typing";
  interval = setInterval(type, 8000);
}

function stoptyping() {
  typing = false;
  document.getElementById("typing").innerHTML = "status: not typing";
  clearInterval(interval);
}
