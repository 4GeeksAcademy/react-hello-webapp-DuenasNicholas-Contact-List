import React,{ useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import {ContactCard} from "../component/contactCard.js"
import { Link } from "react-router-dom";

export const Home = () => {
	const [contacts, setContacts] = useState([])
	const {store, actions} = useContext(Context)
	useEffect(()=>{
		async function getContacts(){
			await actions.getContacts()
			setContacts(store.contactList)
		}
		getContacts()
	}, [])
	
	return  (
		<>
	<div className="text-center mt-5">
	<div className="container justify-content-center">
		<ul>
			{contacts?.map((contact, index) =>{
				return(<li key={index}> <ContactCard contact = {contact} index = {index}/>  </li>)
			})}
		</ul>
		<div><Link className="btn btn-primary btn-lg ml-auto mt-5" to={"/addContact"}>Add New  Contact</Link></div>
			
	</div>
	</div>
	<button ></button>
	</>
);

}