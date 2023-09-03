let sortedData = [];

const handleSortByViews = () => {
  sortedData = sortedData.sort((a, b) => {
    const viewsA = parseInt(a.others.views.replace("K", "000"));
    const viewsB = parseInt(b.others.views.replace("K", "000"));
    return viewsB - viewsA;
  });
  renderData(sortedData);
};

document
  .getElementById("sort-button")
  .addEventListener("click", handleSortByViews);

//   ------------
const renderData = (data) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (data.length === 0) {
    const noDataContainer = document.createElement("div");
    noDataContainer.style.display = "flex";
    noDataContainer.style.alignItems = "center";
    noDataContainer.style.justifyContent = "center";
    noDataContainer.style.height = "100vh";

    const noDataImage = document.createElement("img");
    noDataImage.src = "https://i.ibb.co/nmR7RfJ/Icon.png";

    const noDataText = document.createElement("p");
    noDataText.textContent = "No data available";

    noDataContainer.appendChild(noDataImage);
    cardContainer.appendChild(noDataContainer);
    noDataContainer.appendChild(noDataText);
  } else {
    data.forEach((category) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
          <figure><img src=${category.thumbnail} alt="Shoes" />
          <p>${category.others.posted_date}<p></figure>

          <div class="card-body">
            <div class="avatar gap-4">
              <div class="w-10 rounded-full">
                <img src=${category.authors[0].profile_picture} />
              </div>
              <h2 class="card-title">${category.title}</h2>
            </div>
            <div class="ml-14">
            <div>
           <div class="flex">
           <h6 class="mr-2">${category.authors[0].profile_name}</h6>
           ${
             category.authors[0].verified
               ? '<img src="https://icon-library.com/images/verified-icon-png/verified-icon-png-5.jpg" alt="Verified" width="20px" height="20px" />'
               : ""
           }
           </div>
            <p>${category.others.views}</p>
          </div>
            </div>
          </div>
        </div>
      `;
      cardContainer.appendChild(div);
    });
  }
};

const handleCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const tabContainer = document.getElementById("tab-container");
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <a onclick="handleAllItems('${category.category_id}')" class="tab">${category.category}</a>
    `;
    tabContainer.appendChild(div);
  });
  handleAllItems("1000");
};

const handleAllItems = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  sortedData = data.data;
  renderData(sortedData);
};

handleCategory();
