// pages/form.jsx
import logger from "@/logger";
import React, { useState } from "react";

async function getAllUsers() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3MjAwMTExLCJpYXQiOjE3MjY1OTUzMTEsImp0aSI6ImVjMGQ2Y2NhYTdjNTRmMmM4YWEyOTQwZWY0NmM1ZGI0IiwidXNlcl9pZCI6MX0.cfhGUxxBbQRxxN2Ba_DgLgT7GY9b-BDby-7ngceSpLs";

  const response = await fetch("http://192.168.0.110:8800/api/v1/users/", {
    method: "GET", // ou 'POST', se for o caso
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Inclua isso se estiver enviando JSON
    },
  });

  if (!response.ok) {
    logger.error('Ocorreu um erro !')
  }
  else{
    logger.info('Sucesso na requisição !')
    return response.json
  }
}

export default async function PageHome() {
  const users = await getAllUsers();
  return (
    <>
      <h1>Teste 1</h1>
    </>
  );
}
