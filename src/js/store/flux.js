const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contactList: [
				
			],

		},
		actions: {

			createContact: async(full_name, email, phone, address) => {	

				let options = {
					method:"POST",
					body: JSON.stringify({
						full_name: full_name,
						phone: phone,
						email: email,
						address: address,
						agenda_slug: "nico_agenda",
						
					}),
					headers: {"Content-Type": "application/JSON"}
				}
				let response = await fetch("https://playground.4geeks.com/apis/fake/contact", options)
				let data = await response.json()
				console.log(data)
			},

			// addContact:(aNewContact)=>{

			// const store = getStore();
			// let reviseStore = [...store.contactList, aNewContact];
			// getActions().createContact(aNewContact);
				
			// 	setStore({contactList:reviseStore})
			// },

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
					headers: {"Content-Type": "application/JSON"}
				})
				const data = await respone.json()
				console.log(data)
			},

			deleteContact: async(contactId) => {
			const respone = await fetch("https://playground.4geeks.com/apis/fake/contact/"+ contactId,{
					method:"DELETE",
					
					headers: {"Content-Type": "application/JSON"}
				})
				const data = await respone.json()
				console.log(data)
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
