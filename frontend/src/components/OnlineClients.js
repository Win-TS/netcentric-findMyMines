import { useOnlineClients } from "../hooks/socketHooks";

const OnlineClients = () => {
  const onlineClients = useOnlineClients();

  return <h3>Online Clients: {onlineClients}</h3>;
};

export default OnlineClients;
