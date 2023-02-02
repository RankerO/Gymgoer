import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import QRCode from "react-qr-code";
// import { Box, TagLabel } from "@chakra-ui/react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function UserPage() {
  const [unique_id, setUniqueID] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // console.log(imageUrl);
  // const generateQrCode = async () => {
  //   try {
  //     const response = await QRCode.toDataURL(unique_id);
  //     setImageUrl(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 10
  };

  const logout = () => {
    localStorage.setItem("userInfo", null);
    window.location = "/";
  }

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    console.log(userInfo.uniqueID);
      setUniqueID(userInfo.uniqueID);
    }, []);
  if (userInfo == null) {
    window.location = "/";
  } else if (userInfo.isAdmin) {
    window.location = "/admin"
  } else {

    return (
      // Important! Always set the container height explicitly
      <>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
        <div style={{ height: '80vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
        <Box >
          <QRCode value={unique_id} />
          <label>Unique ID</label>
          <button>{unique_id}</button>
        </Box>
      </>
    );
  }
}
