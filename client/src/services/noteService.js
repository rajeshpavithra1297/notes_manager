const API_URL = import.meta.env.VITE_API_URL;

 export const getNotes = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/notes`, {
    method:"GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

   const data = await response.json();

  return {
    response,
    data,
  };
};

export const createNote= async(title,description)=>{
    const token= localStorage.getItem("token");
    const response= await fetch(`${API_URL}/api/notes`,
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            title,
            description
        })
    })

    const data = await response.json();

  return {
    response,
    data,
  };
}


export const updateNote = async (
  noteId,
  title,
  description
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/notes/${noteId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        title,
        description,
      }),
    }
  );

  const data = await response.json();

  return {
    response,
    data,
  };
};

export const deleteNote = async (noteId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
   `${API_URL}/api/notes/${noteId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return {
    response,
    data,
  };
};

