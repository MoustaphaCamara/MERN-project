import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  // le nom quand il sera save dans notre bdd
  // quand on va utiliser getUser, le paramètre qu'on va passer = le payload
  name: "user",
  initialState: {
    userId: null,
  },
  reducers: {
    getUser: (state, { payload }) => {
      state.userId = payload;
    },
  },
});

export const { getUser } = userSlice.actions;
// ça c'est pour récupérer dans le composant qu'on veut et dispatch l'info au store (afin que les autres comp puissent puiser dedans)
export default userSlice.reducer;
