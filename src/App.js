import React, { Component } from "react";
import Particles from "react-particles-js";
import "./App.css";
import Faces from "./Faces/faces.js";
import SignIn from "./SignIn/signIn";
import Register from "./Register/register";
import Navigation from "./Navigation/navigation";
import Logo from "./Logo/logo";
import ImageLinkForm from "./ImageLinkForm/imageLinkForm";
import Rank from "./Rank/rank";



const particlesOptions = {
  particles: {
    number: {
      value: 279,
      density: {
        enable: true,
        value_area: 900,
      },
    },
  },
};
const initialState = {
  input: "",
  imageUrl: "",
  box: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: [],
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions;
    const coordinatesOfFaces = clarifaiFace.map((arg) => {
      return arg.region_info.bounding_box;
    });
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    let faceLocations = [];
    for (let index = 0; index < coordinatesOfFaces.length; index++) {
      faceLocations.push({
        leftCol: coordinatesOfFaces[index].left_col * width,
        topRow: coordinatesOfFaces[index].top_row * height,
        rightCol: width - coordinatesOfFaces[index].right_col * width,
        bottomRow: height - coordinatesOfFaces[index].bottom_row * height,
      });
    }
    return faceLocations;
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onHandleFocus = (event) => event.target.select();

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://nameless-harbor-69547.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
    .then(response => response.json())
    .then((response) => {
      if (response) {
        fetch("https://nameless-harbor-69547.herokuapp.com/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.user.id,
          }),
        })
          .then((response) => response.json())
          .then((count) => {
            this.setState(Object.assign(this.state.user, { entries: count }));
          })
          .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onHandleFocus={this.onHandleFocus}
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <Faces box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
