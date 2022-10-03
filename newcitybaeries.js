var firstname;
var lastname;
var address;
var postalcode;
var email;
var typeofcake;

function checkfirstname() {
    firstname = document.getElementById("firstname").value;
    var letters = /[A-Za-z][A-Za-z-\.]/;
    if ((letters).test(firstname)) {
        document.getElementById("firstnameinfo").innerHTML = "&#x2714";
        document.getElementById("firstnameinfo").style.color = "#00cc66";
        document.getElementById("firstnameinfo").style.textShadow = "1px 1px #ccffff";
    }
    else {
        document.getElementById("firstnameinfo").style.color = "#ff0066";
        document.getElementById("firstnameinfo").innerHTML = "*Only contains alphabetic, spaces and hyphens*";
    }
}

function checklastname() {
    lastname = document.getElementById("lastname").value;
    var letters = /[A-Za-z][A-Za-z-\.]/;
    if ((letters).test(lastname)) {
        document.getElementById("lastnameinfo").innerHTML = "&#x2714";
        document.getElementById("lastnameinfo").style.color = "#00cc66";
        document.getElementById("lastnameinfo").style.textShadow = "1px 1px #ccffff";
    }
    else {
        document.getElementById("lastnameinfo").style.color = "#ff0066";
        document.getElementById("lastnameinfo").innerHTML = "*Only contains alphabetic, spaces and hyphens*";
    }
}

function checkpostalcode() {
    postalcode = document.getElementById("postalcode").value;
    var format = /[A-Za-z][0-9][A-Za-z][\s][0-9][A-Za-z][0-9]/;
    if (format.test(postalcode)) {
        document.getElementById("postalcodeinfo").innerHTML = "&#x2714";
        document.getElementById("postalcodeinfo").style.color = "#00cc66";
        document.getElementById("postalcodeinfo").style.textShadow = "1px 1px #ccffff";
    } else {
        document.getElementById("postalcodeinfo").style.color = "#ff0066";
        document.getElementById("postalcodeinfo").innerHTML = "*Postal code format is A9A 9A9*";
    }
}

function checkphonenumber() {
    phonenumber = document.getElementById("phonenumber").value;
    var format = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
    if (format.test(phonenumber)) {
        document.getElementById("phonenumberinfo").innerHTML = "&#x2714";
        document.getElementById("phonenumberinfo").style.color = "#00cc66";
        document.getElementById("phonenumberinfo").style.textShadow = "1px 1px #ccffff";
    } else {
        document.getElementById("phonenumberinfo").style.color = "#ff0066";
        document.getElementById("phonenumberinfo").innerHTML = "*Phone number format is 123-456-7890*";
    }
}

function checkemail() {
    email = document.getElementById("email").value;
    var format = /[(\w)(\d)][(\@)(\.)+]/;
    if (format.test(email)) {
        document.getElementById("emailinfo").innerHTML = "&#x2714";
        document.getElementById("emailinfo").style.color = "#00cc66";
        document.getElementById("emailinfo").style.textShadow = "1px 1px #ccffff";
    } else {
        document.getElementById("emailinfo").style.color = "#ff0066";
        document.getElementById("emailinfo").innerHTML = "*Email Address is required*";
    }
}

function selecttype(){
    //get radio button
    typeofcake=document.querySelector("input[name=typeofcake]:checked").value;
    if (typeofcake == "sheet") {
        document.getElementById("sheetcake").style.visibility="visible";
        document.getElementById("roundcake").style.visibility="hidden";
    } else {
        document.getElementById("roundcake").style.visibility="visible";
        document.getElementById("sheetcake").style.visibility="hidden";
    }
}

function checknumber(v) {
    var id=v.id;
    var inputvalue = document.getElementById(id).value;
    var min = document.getElementById(id).min;
    var max = document.getElementById(id).max;
    if (inputvalue.value != "") {
        if (parseInt(inputvalue) < parseInt(min)) {
            document.getElementById(id).value = min;
        }
        if (parseInt(inputvalue) > parseInt(max)) {
            document.getElementById(id).value = max;
        }
    }
}

function orderreceipt(){
    checkfirstname();
    checklastname();
    checkphonenumber();
    checkpostalcode();
    checkemail();
    address = document.getElementById("address").value;
    var receipt = "<table><tr><td><span>" +
                        firstname + " " + lastname + "<br>" +
                        address + "<br>" + 
                        postalcode + "<br>" +
                        phonenumber + "<br>" +
                        email + "<br>" + 
                        "<br>" +
                        "Your order" + "<br>" +
                        "</span></td></tr>";

    var costbasis=0;   
    var additionaldimensioncharge=parseFloat(0); 
    var layercharge=parseFloat(0); 
    var extracharge=parseFloat(0); 
    var totalcharge=parseFloat(0); 
    var layers=0;

    if (typeofcake == "sheet") {
        var width=parseInt(document.getElementById("width").value);
        var length=parseInt(document.getElementById("length").value);
        layers=parseInt(document.getElementById("sheetlayers").value);
        costbasis=18;
        additionaldimensioncharge= (length * width - 900) *0.02;

        if (layers > 1) {
            receipt += "<tr><td>Sheet cake " + length + " x " + width + " with " + layers + " layers:</td>";
        } else {
            receipt += "<tr><td>Sheet cake " + length + " x " + width + " with " + layers + " layer:</td>";
        }
    } else {
        var radius=parseInt(document.getElementById("radius").value);
        layers=parseInt(document.getElementById("roundlayers").value);
        costbasis = 15;
        additionaldimensioncharge= (radius * radius * 3.14 - 707) *0.02;

        if (layers > 1) {
            receipt += "<tr><td>Round cake " + radius + " with " + layers + " layers:</td>";
        } else {
            receipt += "<tr><td>Round cake " + radius + " with " + layers + " layer:</td>";
        }
    } 

    layercharge=(layers - 1) * (costbasis+additionaldimensioncharge) *0.5;
    totalcharge=(costbasis+additionaldimensioncharge+layercharge);
    receipt += "<td>$" + totalcharge.toFixed(2) + "</td></tr>";

    if (document.querySelector("input[name=cheese]:checked")) {
        extracharge += 5;
        receipt += "<tr><td>Cream Cheese icing</td><td>$5</td></tr>";
    }

    if (document.querySelector("input[name=fruit]:checked")) {
        extracharge += 7;
        receipt += "<tr><td>Fruit and Almond topping</td><td>$7</td></tr>";
    }

    if (document.querySelector("input[name=jam]:checked")) {
        extracharge += 4;
        receipt += "<tr><td>Fruit Jam filling</td><td>$4</td></tr>";
    }

    totalcharge += extracharge;
    receipt += "<tr><td>Total</td><td>$" + totalcharge.toFixed(2)+ "</td></tr></table>";

    document.getElementById("displayorder").style.visibility="visible";                   
    document.getElementById("displayorder").innerHTML = receipt;
}