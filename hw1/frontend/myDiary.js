const itemTemplate = document.querySelector("#diary-item-template");
const diaryList = document.querySelector("#card-place");
const dateInput = document.querySelector("#date-input");
const labelInput = document.querySelector("#label-input");
const moodInput = document.querySelector("#mood-input");
const contentInput = document.querySelector("#content-input");
const windowtitle = document.getElementById("window-title");

const browsedate = document.querySelector("#title-date");
const browselabel = document.querySelector("#label");
const browsemood = document.querySelector("#mood");
const browsecontent = document.querySelector("#content");
const apiRoot = "http://localhost:7000/api";
const day = ["（日）","（一）","（二）","（三）","（四）","（五）","（六）"];


var isFromCard = false;


async function main(){
    setupEventListeners();
    try {
        const diaries = await getDiaries();
        diaries.forEach((diary) => renderDiary(diary));
    } catch (error) {
        alert("Failed to load diaries!");
    }
}

function setupEventListeners(){
    const addDiaryButton = document.getElementById("add-diary");
    const addDiaryWindow = document.getElementById("diary-edit-window");
    const closeButton1 = document.querySelector("#close-button-edit");
    const closeButton2 = document.querySelector("#close-button-browse");
    const saveButton = document.querySelector("#save-button");
    const browseWindow = document.getElementById("diary-browse-window");
    const filter = document.querySelector("#filter");
    const filter_input = document.querySelector("#filter-part");
    const filter_checkbox = document.querySelector("#filter-check");
    const filterInput = document.querySelector("#filter-input");

    var isOpen = false;
    var originalInput = "None";
    filterInput.value = "None";
    filter.addEventListener("click",() => {
        if (isOpen === false)
        {
            originalInput = filterInput.value;
            filter_input.style.display = "inline-block";
            filter.style.rotate = "90deg";
            isOpen = true;
        }

        else
        {
            filterInput.value = originalInput;
            filter_input.style.display = "none";
            filter.style.rotate = "0deg";
            isOpen = false;
        }
    })

    filter_checkbox.addEventListener("click", async() => {
        filter_input.style.display = "none";
        filter.style.rotate = "0deg";
        isOpen = false;
        const diaries = await getDiaries();
        diaries.forEach((diary) => filterDiary(diary));
    })

    
    addDiaryButton.addEventListener("click", async() => {
        isFromCard = false;
        const diaries = await getDiaries();
        filterInput.value = "None";
        diaries.forEach((diary) => filterDiary(diary));
        
        windowtitle.textContent = "Add your diary!";
        dateInput.valueAsDate = new Date();
        labelInput.value = "學業";
        moodInput.value = "快樂";
        contentInput.value = "";
        addDiaryWindow.style.display = "block";
    })

    
    saveButton.addEventListener("click", async() => {
        if (isFromCard === false)
        {
            const editButton = document.querySelector("#edit-button");
            const newDay = new Date(dateInput.value);
            const date = dateInput.value.substr(0,4) + "." + dateInput.value.substr(5,2) + "." + dateInput.value.substr(8,2) + day[newDay.getDay()];
            const label = labelInput.value;
            const mood = moodInput.value;
            const content = contentInput.value;
            if (!date) {
                alert("Please enter a date!");
                return;
            }
            if (!label) {
                alert("Please enter a diary label!");
                return;
            }
            if (!mood) {
                alert("Please enter a diary mood!");
                return;
            }
            if (!content) {
                alert("Please enter some diary content!");
                return;
            }

            addDiaryWindow.style.display = "none";
            browsedate.textContent = date;
            browselabel.textContent = label;
            browsemood.textContent = mood;
            browsecontent.textContent = content;
            browseWindow.style.display = "block";

            editButton.addEventListener("click", () => {
                browseWindow.style.display = "none";
                windowtitle.textContent = "Edit your diary!";
                addDiaryWindow.style.display = "block";
            })
        }    
    })    

    closeButton1.addEventListener("click", () => {
        addDiaryWindow.style.display = "none";
    })

    closeButton2.addEventListener("click", async() => {
        if (isFromCard === false)
        {
            try {
                const newDay = new Date(dateInput.value);
                const date = dateInput.value.substr(0,4) + "." + dateInput.value.substr(5,2) + "." + dateInput.value.substr(8,2) + day[newDay.getDay()];
                const label = labelInput.value;
                const mood = moodInput.value;
                const content = contentInput.value;
                const diary = await createDiary({ date, label, mood, content });
                if (isFromCard === false)
                    renderDiary(diary);
            } catch (error) {
                alert("Failed to create diary!");
                return;
            }
            browseWindow.style.display = "none";
            dateInput.value = "";
            labelInput.value = "";
            moodInput.value = "";
            contentInput.value = "";
            location.reload();
        }
        else
            browseWindow.style.display = "none";
    })
}

function renderDiary(diary) {
    const item = createDiaryElement(diary);
    diaryList.appendChild(item);
}

function filterDiary(diary) {
    const filterInput = document.querySelector("#filter-input");
    const filteredDiary = document.getElementById(diary.id);
    filteredDiary.style.display = "inline-block";
    if (filterInput.value === "None")
    {
        return;
    }

    if (filterInput.value !== diary.label && filterInput.value !== diary.mood)
    {
        filteredDiary.style.display = "none";
    }
    
}

function createDiaryElement(diary) {
    var isFirst = true;
    const item = itemTemplate.content.cloneNode(true);
    const container = item.querySelector(".diary-card");
    const diary_date = item.querySelector(".card-date");
    const label_tag = item.querySelector(".card-label");
    const mood_tag = item.querySelector(".card-mood");
    const content_preview = item.querySelector(".preview-content");
    container.id = diary.id;

    const browseWindow = document.getElementById("diary-browse-window");
    const addDiaryWindow = document.getElementById("diary-edit-window");
    const editButton = document.querySelector("#edit-button");
    const saveButton = document.querySelector("#save-button");
    const closeButton2 = document.querySelector("#close-button-browse");


    
    container.addEventListener("click", () => {
        const id = diary.id;
        isFromCard = true;
        isFirst = true;
        browsedate.textContent = diary.date;
        browselabel.textContent = diary.label;
        browsemood.textContent = diary.mood;
        browsecontent.textContent = diary.content;
        browseWindow.style.display = "block";
        editButton.dataset.id = id;
        editButton.addEventListener("click", () => {
            if (isFirst === true)
            {
                browseWindow.style.display = "none";
                dateInput.value = diary.date.substr(0,4) + "-" + diary.date.substr(5,2) + "-" + diary.date.substr(8,2);
                labelInput.value = diary.label;
                moodInput.value = diary.mood;
                contentInput.value = diary.content;
                windowtitle.textContent = "Edit your diary!";
                addDiaryWindow.style.display = "block";
                isFirst = false;
            }

            else
            {
                browseWindow.style.display = "none";
                windowtitle.textContent = "Edit your diary!";
                addDiaryWindow.style.display = "block";
            }
        })

        saveButton.dataset.id = id;
        saveButton.addEventListener("click", async() => {
            const newDay = new Date(dateInput.value);
            const date = dateInput.value.substr(0,4) + "." + dateInput.value.substr(5,2) + "." + dateInput.value.substr(8,2) + day[newDay.getDay()];
            const label = labelInput.value;
            const mood = moodInput.value;
            const content = contentInput.value;
            if (!date) {
                alert("Please enter a date!");
                return;
            }
            if (!label) {
                alert("Please enter a diary label!");
                return;
            }
            if (!mood) {
                alert("Please enter a diary mood!");
                return;
            }
            if (!content) {
                alert("Please enter some diary content!");
                return;
            }

            addDiaryWindow.style.display = "none";
            browsedate.textContent = date;
            browselabel.textContent = label;
            browsemood.textContent = mood;
            browsecontent.textContent = content;
            browseWindow.style.display = "block";

            closeButton2.dataset.id = id;
            closeButton2.addEventListener("click", async() => {
                if (isFirst !== true)
                {
                    await updateDiaryElement(id);
                    dateInput.value = "";
                    labelInput.value = "";
                    moodInput.value = "";
                    contentInput.value = "";
                }
            })
        })

    })

    diary_date.textContent = diary.date;
    label_tag.textContent = diary.label;
    mood_tag.textContent = diary.mood;
    content_preview.textContent = diary.content;
    
    
    
    return item;
}

async function updateDiaryElement(id) {
    const newDay = new Date(dateInput.value);
    const date = dateInput.value.substr(0,4) + "." + dateInput.value.substr(5,2) + "." + dateInput.value.substr(8,2) + day[newDay.getDay()];
    const label = labelInput.value;
    const mood = moodInput.value;
    const content = contentInput.value;
    try {
        await updateDiary({ date, label, mood, content }, id);
        location.reload();
    } catch (error) {
        alert("Failed to update diaries!");
    }  
}

async function getDiaries(diary) {
    const response = await fetch(`${apiRoot}/diaries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diary),
    });
    const data = await response.json();
    return data;
  }

async function createDiary(diary) {
    const response = await fetch(`${apiRoot}/diaries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diary),
    });
    const data = await response.json();
    return data;
  }

async function updateDiary(diary, id) {
    const response = await fetch(`${apiRoot}/diaries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diary),
    });
    const data = await response.json();
    return data;
  }




main();
