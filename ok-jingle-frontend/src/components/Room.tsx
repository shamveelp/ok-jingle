import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Room = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    
  }, [name])

  return <div>
    hi {name}
  </div>;
};

export default Room;
