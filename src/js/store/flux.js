const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contactList: [
				
			],

		},
		actions: {

			createContact: newContact => {	

				let options = {
					method:"POST",
					body: JSON.stringify(newContact),
					headers: {"Context-Type": "application/JSON"}
				}
				fetch("https://playground.4geeks.com/apis/fake/contact", options)
				.then(response=>{
					if(!response.ok)throw Error(response.statusText);
					return response
				})
				.then(response => console.log('successfully created', response))
			},

			addContact:(aNewContact)=>{

			const store = getStore();
			let reviseStore = [...store.contactList, aNewContact];
			getActions().createContact(aNewContact);
				
				setStore({contactList:reviseStore})
			},

			updateContact: async(contactId, full_name, email, phone, address) => {
				const respone = await fetch("https://playground.4geeks.com/apis/fake/contact/"+ contactId,{
					method:"PUT",
					body: JSON.stringify({
						full_name: full_name,
						phone: phone,
						email: email,
						address: address,
						agenda_slug: "nico_agenda",
						
					}),
					headers: {"Context-Type": "application/JSON"}
				})
				const data = await respone.json()
				setStore({contactList:[...getStore().contactList,data]})
			},

			deleteContact: async(contactId) => {
			const respone = await fetch("https://playground.4geeks.com/apis/fake/contact/"+ contactId,{
					method:"DELETE",
					
					headers: {"Context-Type": "application/JSON"}
				})
				const data = await respone.json()
				setStore({contactList:store.contactList.filter((contact)=> contact.id !== contactId )})
			},

			getContacts: async() => {
				const respone = await fetch ("https://playground.4geeks.com/apis/fake/contact/agenda/nico_agenda" );
				const data = await respone.json()
				setStore({contactList:data})
			},
			
			saveContact: (name, address, phone, email) => {
				let newContact = {
					name: name,
					email: email,
					phone: phone,
					address: address,
					agenda_slug:"nico_agenda"
				}
				getActions().addContact(newContact)
			}
		}
	};
};

export default getState;
