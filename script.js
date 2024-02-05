const fields = ["image", "symbol", "name", "summary"]
      const row = (k, v, i) => {
        // complete tr string
        //return `<tr>${Object.entries(v).filter(([k,v])=>fields.includes(k)).map(([k, v], i) => cell(k,v)).join('')}</tr>`
        return `<tr>${fields.map((f) => cell(k, f, v)).join("")}</tr>`
      }

      const cell = (sym, prop, v) => {
        switch (prop) {
          case "image":
            return `<td class="w-16 p-2 align-top border-b border-gray-200"><img class="h-full w-auto" src="${v[prop]}" /></td>`
          case "symbol":
            return `<td class="p-2 align-top border-b border-gray-200">${sym}</td>`
          case "name":
            return `<td class="p-2 align-top border-b border-gray-200"><a class="text-blue-400 font-bold hover:underline" href="${v["website"]}" target="_blank">${v[prop]}</a></td>`
          default:
            return `<td class="p-2 align-top border-b border-gray-200">${v[prop]}</td>`
        }
      }

      const createTable = (data) => {
        // create table string and insert it into "app" div before end
        console.log(data)
        const rows = Object.entries(data)
          .map(([k, v], i) => row(k, v, i))
          .join("")

        const rowHead = `<tr>${fields
          .map(
            (f) =>
              `<th class="font-bold bg-gray-200">${f === "image" ? "" : f}</th>`
          )
          .join("")}</tr>`

        const table = `<table class="w-full">${rowHead}${rows}</table>`
        document.getElementById("app").insertAdjacentHTML("beforeend", table)
      }

      const url = "https://api.mtw-testnet.com/assets/all"
      fetch(url)
        .then((response) => {
          return response.json()
        })
        .then((v) => createTable(v))
        .catch((err) => console.log(err))