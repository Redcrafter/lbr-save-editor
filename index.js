let currentSave;

const leaves = [
    {
        name: "Gems",
        id: "gems",
        img: "spr_resource_gem_0.png",
    },
    {
        name: "Silver token",
        id: "silver_token",
        img: "silver_token.png",
    },
    {
        name: "Gold token",
        id: "gold_token",
        img: "gold_token.png",
    },
    {
        name: "Coins",
        id: "coins",
        img: "spr_gold_0.png",
    },
    {
        name: "BLC",
        id: "blc",
        img: "spr_blc_0.png",
    },
    {
        name: "MLC",
        id: "mlc",
        img: "spr_mlc_0.png",
    },
    {},
    {
        name: "Normal",
        id: "leaves",
        img: "spr_leaf_0.png",
    },
    {
        name: "Gold",
        id: "gold",
        img: "spr_leaf_gold_0.png",
    },
    {
        name: "Platinum",
        id: "platinum",
        img: "spr_leaf_platinum_0.png",
    },
    {
        name: "Bismuth",
        id: "bismuth",
        img: "spr_leaf_bismuth_0.png",
    },
    {
        name: "Cosmic",
        id: "cosmic",
        img: "spr_leaf_cosmic_0.png",
    },
    {
        name: "Void",
        id: "void",
        img: "spr_leaf_void_0.png",
    },
    {
        name: "Exotic",
        id: "exotic",
        img: "spr_leaf_exotic_0.png",
    },
    {
        name: "Celestial",
        id: "celestial",
        img: "spr_leaf_celestial_0.png",
    },
    {
        name: "Mythical",
        id: "mythical",
        img: "spr_leaf_mythical_0.png",
    },
    {
        name: "Lava",
        id: "lava",
        img: "spr_leaf_lava_0.png",
    },
    {
        name: "Ice",
        id: "ice",
        img: "spr_leaf_ice_0.png",
    },
    {
        name: "Obsidian",
        id: "obsidian",
        img: "spr_leaf_obsidian_0.png",
    },
    {
        name: "Silicon",
        id: "silicon",
        img: "spr_leaf_silicon_0.png",
    },
    {
        name: "Benitoite",
        id: "benitoite",
        img: "spr_leaf_benitoite_0.png",
    },
    {
        name: "Moonstone",
        id: "moonstone",
        img: "",
    },
    {
        name: "Sand",
        id: "sand",
        img: "",
    },
    {
        name: "Ancient",
        id: "ancient",
        img: "",
    },
    {
        name: "Sacred Leaves",
        id: "sacred",
        img: "",
    },
    {
        name: "Biotite Leaves",
        id: "biotite",
        img: "",
    },
    {
        name: "Malachite Leaves",
        id: "malachite",
        img: "",
    },
    {
        name: "Hematite Leaves",
        id: "hematite",
        img: "",
    },
    {},
    {
        name: "Amber",
        id: "amber",
        img: "spr_leaf_amber_0.png",
    },
    {
        name: "Amethyst",
        id: "amethyst",
        img: "spr_leaf_amethyst_0.png",
    },
    {
        name: "Emerald",
        id: "emerald",
        img: "spr_leaf_emerald_0.png",
    },
    {
        name: "Kyanite",
        id: "kyanite",
        img: "spr_leaf_kyanite_0.png",
    },
    {
        name: "Rhodonite",
        id: "rhodonite",
        img: "spr_leaf_rhodonite_0.png",
    },
    {
        name: "Ruby",
        id: "ruby",
        img: "spr_leaf_ruby_0.png",
    },
    {
        name: "Tektite",
        id: "tektite",
        img: "spr_leaf_tektite_0.png",
    },
    {},
    {
        name: "Red Science",
        id: "flask_red",
        img: "spr_flask_red_0.png",
    },
    {
        name: "Green Science",
        id: "flask_green",
        img: "spr_flask_green_0.png",
    },
    {
        name: "Blue Science",
        id: "flask_blue",
        img: "spr_flask_blue_0.png",
    },
    {
        name: "Magenta Science",
        id: "flask_magenta",
        img: "spr_flask_magenta_0.png",
    },
    {
        name: "Orange Science",
        id: "flask_orange",
        img: "spr_flask_orange_0.png",
    },
    {
        name: "Black Science",
        id: "flask_black",
        img: "spr_flask_black_0.png",
    },
    {
        name: "Strange Science",
        id: "flask_strange",
        img: "spr_flask_strange_0.png",
    },
    {},
    {
        name: "Challenge Points",
        id: "cp",
        img: "spr_cp.png",
    },
    {
        name: "Borbs",
        id: "borbs",
        img: "borb.png",
    },
    {
        name: "Cheese",
        id: "cheese",
        img: "cheese.png",
    },
    {
        name: "Beer",
        id: "beer",
        img: "",
    },
    {
        name: "Mulch",
        id: "mulch",
        img: "",
    },
    {
        name: "Shards",
        id: "shards",
        img: "",
    },
];

document.addEventListener("DOMContentLoaded", () => {
    let fileInput = document.getElementById("fileInput");

    fileInput.addEventListener("input", () => {
        let reader = new FileReader();
        reader.addEventListener("load", (e) =>
            fileInput.files[0].type === "application/json"
                ? loadJson(e.target.result)
                : loadDat(e.target.result)
        );
        reader.readAsText(fileInput.files[0]);
    });

    document.getElementById("saveButton").addEventListener("click", save);
    document.getElementById("saveRawButton").addEventListener("click", saveRaw);
});

/** @param  {...number} items */
function createRow(...items) {
    let row = document.createElement("tr");

    for (const item of items) {
        let td = document.createElement("td");
        if (typeof item == "string" || typeof item == "number") {
            td.innerText = item;
        } else {
            td.appendChild(item);
        }
        row.append(td);
    }

    return row;
}

/** @param {string} data */
function sha1Array(data) {
    let hash = sha1.create();
    hash.update(data);
    return hash.array();
}

/**
 * @param {string} message
 * @param {string} key
 * @returns {string} hash
 */
function SHA1_hmac(message, key) {
    const hashSize = 20;
    const blockSize = 64;

    const keyBuf = new Uint8Array(blockSize);
    const ipad = new Uint8Array(blockSize + message.length);
    const opad = new Uint8Array(blockSize + hashSize);

    if (key.length > blockSize) {
        let hash = sha1Array(key);
        for (let i = 0; i < hash.length; i++) {
            keyBuf[i] = hash[i];
        }
    } else {
        for (let i = 0; i < key.length; i++) {
            keyBuf[i] = key.charCodeAt(i);
        }
    }

    for (let i = 0; i < blockSize; i++) {
        ipad[i] = keyBuf[i] ^ 0x36;
        opad[i] = keyBuf[i] ^ 0x5c;
    }

    for (let i = 0; i < message.length; i++) {
        ipad[i + blockSize] = message.charCodeAt(i);
    }

    let inner = sha1Array(ipad);

    for (let i = 0; i < hashSize; i++) {
        opad[i + blockSize] = inner[i];
    }

    return sha1(opad);
}

function parseDate(t) {
    return new Date(t.year, t.month - 1, t.day, t.hour, t.minute, t.second);
}
function writeDate(t, date) {
    t.year = date.getFullYear();
    t.month = date.getMonth() + 1;
    t.day = date.getDate();

    t.hour = date.getHours();
    t.minute = date.getMinutes();
    t.second = date.getSeconds();
}

function dateString(t) {
    function pad(v, l = 2) {
        return v.toString().padStart(l, "0");
    }
    return `${pad(t.year, 4)}-${pad(t.month)}-${pad(t.day)}T${pad(
        t.hour
    )}:${pad(t.minute)}:${pad(t.second)}`;
}

/** @param {string} str */
function capitalize(str) {
    return str
        .split(" ")
        .map((x) => x[0].toUpperCase() + x.substr(1))
        .join(" ");
}

/** @param {string} data */
function test(data) {
    data = atob(data);
    let saveStr = data.substring(0, data.length - 42);
    let origHash = data.substring(data.length - 41, data.length - 1);

    let hash = SHA1_hmac(saveStr, "ke03m!5ng93nan7p24lyg343nml2o591");

    if (origHash !== hash) {
        alert("Hash test failed.\nThe save editor is no longer working.");
    }
}

/** @param {string} currentSave */
function processSave(currentSave) {
    console.log(currentSave);

    let profile = currentSave.profiles[currentSave.current_profile];

    let resourceTable = document.getElementById("resources");
    while (resourceTable.firstChild) {
        resourceTable.removeChild(resourceTable.firstChild);
    }
    resourceTable.appendChild(createRow("", "Resources", "Amount", "Unlocked"));

    for (const leaf of leaves) {
        if (!leaf.id) {
            let tr = document.createElement("tr");
            tr.style.lineHeight = "0.75em";
            tr.style.columnSpan = "4";
            tr.innerHTML = "&nbsp;";
            resourceTable.appendChild(tr); // empty row
            continue;
        }

        let item = profile.resources[leaf.id];

        if (!item) {
            profile.resources[leaf.id] = item = {
                collected: 0,
                collected_total: 0,
                count: 0,
                level: 0, // ???
                unlocked: 0,
                unlocked_fruit: 0,
            };
            leaf.name += " (new)";
        }

        let img = document.createElement("img");
        if (leaf.img) {
            img.src = `./img/${leaf.img}`;
        }

        let label = document.createElement("label");
        label.innerText = leaf.name;

        let amount = document.createElement("input");
        amount.setAttribute("type", "number");
        amount.value = item.count;
        amount.disabled = !item.unlocked;

        amount.addEventListener("change", () => {
            let value = amount.valueAsNumber;

            let change = value - item.count;

            item.count = value;
            item.collected += change;
            item.collected_total += change;
        });

        let unlock = document.createElement("input");
        unlock.type = "checkbox";
        unlock.checked = item.unlocked;
        unlock.addEventListener("input", () => {
            amount.disabled = !unlock.checked;
            item.unlocked = unlock.checked;
        });

        resourceTable.appendChild(createRow(img, label, amount, unlock));
    }

    let artifactTable = document.getElementById("artifacts");
    while (artifactTable.firstChild) {
        artifactTable.removeChild(artifactTable.firstChild);
    }
    let elements = [];
    let relative = true;

    {
        let div = document.createElement("div");

        let relCheck = document.createElement("input");
        relCheck.type = "checkbox";
        relCheck.checked = true;
        relCheck.oninput = () => {
            relative = relCheck.checked;
            let t = relative ? "number" : "datetime-local";
            elements.forEach((x) => {
                x.el.type = t;
                x.updateTime();
            });
        };
        div.appendChild(relCheck);

        let label = document.createElement("label");
        label.innerText = "Relative";

        div.append(document.createTextNode("Next spawn"), relCheck, label);
        artifactTable.appendChild(
            createRow("Artifacts", "Shown", "Collected", "Count", div)
        );
    }

    for (const key in profile.artifacts) {
        let item = profile.artifacts[key];

        let timeEl = document.createElement("input");
        elements.push({
            el: timeEl,
            updateTime,
        });
        timeEl.type = "number";

        function updateTime() {
            if (document.activeElement === timeEl) return;
            if (relative) {
                let next = (parseDate(item.spawn_time_raw) - new Date()) / 1000;
                timeEl.value = Math.floor(next);
            } else {
                timeEl.value = dateString(item.spawn_time_raw);
            }
        }
        updateTime();
        setInterval(updateTime, 1000);
        timeEl.addEventListener("change", () => {
            if (relative) {
                let date = new Date();
                date.setTime(date.getTime() + timeEl.valueAsNumber * 1000);
                writeDate(item.spawn_time_raw, date);
            } else {
                let [a, b] = timeEl.value.split("T");
                a = a.split("-").map((x) => parseInt(x));
                b = b.split(":").map((x) => parseInt(x));

                item.spawn_time_raw.year = a[0];
                item.spawn_time_raw.month = a[1];
                item.spawn_time_raw.day = a[2];

                item.spawn_time_raw.hour = b[0];
                item.spawn_time_raw.minute = b[1];
                item.spawn_time_raw.second = b[2];
            }
        });

        function makeIn(name) {
            let el = document.createElement("input");
            el.type = "number";
            el.value = item[name];
            el.style.width = "50px";

            el.addEventListener("change", () => {
                item[name] = value;
            });

            return el;
        }

        artifactTable.appendChild(
            createRow(
                capitalize(key.replace("_", " ")),
                makeIn("shown"),
                makeIn("collected"),
                makeIn("count"),
                timeEl
            )
        );
    }

    document.getElementById("saveButton").hidden = false;
    document.getElementById("saveRawButton").hidden = false;
}

function loadDat(data) {
    test(data);

    data = atob(data);

    currentSave = JSON.parse(data.substring(0, data.length - 42));

    processSave(currentSave);
}

function loadJson(data) {
    currentSave = JSON.parse(data);

    processSave(currentSave);
}

/**
 * @param {string} filename
 * @param {string} data
 */
function download(filename, data) {
    var file = new Blob([data], {
        type: "text/plain",
    });
    if (window.navigator.msSaveOrOpenBlob) {
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    } else {
        // Others
        let a = document.createElement("a");
        let url = URL.createObjectURL(file);

        a.href = url;
        a.download = filename;
        a.style.display = "none";

        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    }
}

function save() {
    writeDate(currentSave.time, new Date());

    let dataString = JSON.stringify(currentSave);
    let hash = SHA1_hmac(dataString, "ke03m!5ng93nan7p24lyg343nml2o591");

    dataString += `#${hash}#`;
    dataString = btoa(dataString);

    download("save.dat", dataString);
}

function saveRaw() {
    download("save.json", JSON.stringify(currentSave, null, 4));
}
