import { useDispatch } from "react-redux";
import axios from "../utilis/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addperson, removeperson } from "../utilis/peopleslice";

export const Usepersondetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getpersonsuggestion = async () => {
    try {
      const details = await axios.get(`/person/${id}`);
      const external_ids = await axios.get(`/person/${id}/external_ids`)
      const combined_credits = await axios.get(`/person/${id}/combined_credits`)
      const movie_credits = await axios.get(`/person/${id}/movie_credits`)
      const tv_credits = await axios.get(`/person/${id}/tv_credits`)
    
      let theultimatedetails = {
        detail: details.data,
        external_ids: external_ids.data,
        combined_credits:combined_credits.data,
        movie_credits: movie_credits.data,
        tv_credits: tv_credits.data,
      };
      dispatch(addperson(theultimatedetails));
    
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getpersonsuggestion();
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
};

