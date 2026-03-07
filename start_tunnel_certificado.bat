@echo off
REM Script para iniciar o Cloudflare Tunnel para Certificado
REM Este arquivo inicia o tunnel certificado.altusci.com.br automaticamente

set TUNNEL_NAME=certificados
set DOMAIN=certificados.altusci.com.br
set LOCAL_URL=http://localhost:3000
set CLOUDFLARED_CONFIG=%USERPROFILE%\.cloudflared\config_certificados.yml

cls
echo ========================================
echo Iniciando Cloudflare Tunnel - %DOMAIN%
echo ========================================
echo.
echo Tunnel: %TUNNEL_NAME%
echo Dominio: %DOMAIN%
echo Local: %LOCAL_URL%
echo Config: %CLOUDFLARED_CONFIG%
echo.
echo Pressione Ctrl+C para parar o tunnel
echo ========================================
echo.

cloudflared tunnel --config %CLOUDFLARED_CONFIG% run %TUNNEL_NAME%

pause
