import { useDispatch } from "react-redux";
import axios from "../utilis/axios";
import { addmovie, removemovie } from "../utilis/movieslice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Usemoviedetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getmoviesuggestion = async () => {
    try {
      const details = await axios.get(`/movie/${id}`);
      const external_ids = await axios.get(`/movie/${id}/external_ids`);
      const recommendations = await axios.get(`/movie/${id}/recommendations`);
      const similar = await axios.get(`/movie/${id}/similar`);
      const videos = await axios.get(`/movie/${id}/videos`);
      const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
      const translations = await axios.get(`/movie/${id}/translations`);
     
      let theultimatedetails = {
        detail: details.data,
        external_ids: external_ids.data,
        recommendations: recommendations?.data.results,
        similar: similar.data.results,
        videos: videos.data.results.filter((m) => m.type === "Trailer")[0],
        wastchproviders: watchproviders.data.results.IN,
        translations: translations,
      };
      dispatch(addmovie(theultimatedetails));
    
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getmoviesuggestion();
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
};
