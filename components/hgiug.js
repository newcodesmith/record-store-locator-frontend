_login = () => {
    Expo.Facebook.logInWithReadPermissionsAsync("593366027693002", {
      permissions: ["public_profile"]
    })
    .then(response => {
      const { token, type } = response
      if(type === "success") {
        fetch(`https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=${token}&fields=id,name,picture.type(large)`)
        .then((response) => response.json())
        .then((fbUser) => {
          this.setState({
            userPicture: fbUser.picture
          })
          this.props.navigation.navigate("User", {currentUser: this.state.currentUser, userPicture: this.state.userPicture})
        })
        .catch(() => {
          reject("ERROR GETTING DATA FROM FACEBOOK")
        })
      } else {
        Alert.alert("Unable to connect to Facebook")
      }
    })
  };