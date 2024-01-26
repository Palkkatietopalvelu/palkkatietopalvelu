const Mail = () => {
    const id = useParams().id
    const [client, setClient] = useState({})
  
    useEffect(() => {
      clientService.get(id).then(data => {
        setClient(data)
      })
    }, [])
  
    return (
      <div>
        <h1>{client.company}</h1>
        <h4>Yhteystiedot</h4>
        <p>Sähköposti: {client.email}</p>
        <p>Puhelinnumero: {client.phonenumber}</p>
        <h4>Laskutustiedot</h4>
        <p>Y-tunnus: {client.bi_code}</p>
        <p>Eräpäivä: {client.deadline}</p>
        <p>Palkkakausi: {client.payperiod}</p>
      </div>
    )
  }
  
  export default Mail