import React from "react";

export default function Carousal1() {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{objectFit:"contain !important"}}
    >
      <div className="carousel-inner position-relative">
        <div className="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
            className="d-block w-100"
            style={{ height: "500px",position:"relative",zIndex:1}}
            alt="Image is unable to load"
          />
          <form className="d-flex" style={{position:"relative",top:"-100px",zIndex:100,marginLeft:"250px", marginRight:"250px"}}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-info bg-dark" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="carousel-item">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
            className="d-block w-100"
            style={{ height: "500px",position:"relative",zIndex:1}}
            alt="Image is unable to load"
          />
          <form className="d-flex" style={{position:"relative",top:"-100px",zIndex:100,marginLeft:"250px", marginRight:"250px"}}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-info bg-dark" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/03/03/34/ai-generated-8609737_1280.jpg"
            className="d-block w-100"
            style={{ height: "500px",position:"relative",zIndex:1,objectFit:"fill"}}
            alt="Image is unable to load"
          />
          <form className="d-flex" style={{position:"relative",top:"-100px",zIndex:100,marginLeft:"250px", marginRight:"250px"}}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-info bg-dark" type="submit">
              Search
            </button>
          </form>
        </div>
        </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
