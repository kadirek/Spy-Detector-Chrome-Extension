"use strict";

function showUserMessage(e, t) {
    console.log("showUserMessage", e);
    var s = document.createElement("div");
    s.id = "driveslides-usermessage", s.innerHTML = e, s.style.position = "fixed", s.style.top = "40px", s.style.left = "50%", s.style.zIndex = 1000002, s.style.width = "500px", s.style.background = "rgba(50, 50, 50, 0.96)", s.style.boxShadow = "0 1px 3px rgba(0,0,0,0.6)", s.style.borderRadius = "3px", s.style.color = "#ffffff ", s.style.marginLeft = "-250px", s.style.padding = "16px 24px 14px", s.style.fontSize = "14px", s.style.lineHeight = "20px", s.style.minHeight = "20px", s.style.textAlign = "center", s.style.fontFamily = "Roboto, sans-serif";
    var o = s.children[0];
    o && (o.style.textDecoration = "underline", o.style.color = "#a1c2fa ", o.style.color = "#a1c2fa ", o.style.fontSize = "15px", o.style.fontWeight = "bold", o.style.marginTop = "15px", o.style.display = "block", o.style.outline = 0, o.onmouseenter = function() {
        this.style.textDecoration = "none"
    }, o.onmouseout = function() {
        this.style.textDecoration = "underline"
    }), document.body.appendChild(s), t && setTimeout(hideUserMessage, 1e3 * t)
}

function hideUserMessage() {
    var e = document.getElementById("driveslides-usermessage");
    e && (e.style.display = "none", e.remove())
}
//# sourceMappingURL=contentscript.js.map