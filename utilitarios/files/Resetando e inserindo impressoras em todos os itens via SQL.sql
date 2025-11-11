-- IMPORTANTE!!! SÓ USAR ESTE COMANDO TENDO PLENA CONSCIÊNCIA DO QUE NECESSITA, IDEAL PARA CONFIGURAR NOVOS CLIENTES

--COMANDO PARA RESETAR AS IMPRESSORAS E CONFIGURAR NOVAMENTE BASEADO EM 1 ITEM CONFIGURADO, NESTE EXEMPLO ITEM ORIGEM 2891

--1 - SELECT
SELECT * FROM ITENSIMPRESSORAS 

--2 - DELETE SÓ USAR ESTE COMANDO SE FOR REALMENTE RESETAR TODOS OS ITENS
DELETE FROM ITENSIMPRESSORAS

--3
DECLARE 
	@IteOrigem INTEGER, 
	@GR2_HANDLE VARCHAR(150) 

SET @IteOrigem = 2891-- Handle do item do qual terá as impressoras duplicadas para as demais 
SET @GR2_HANDLE = '11, 21, 31, 41, 51, 61, 71, 81, 91, 101, 111, 121, 131' --IRÁ REPLICAS AS CONFIGS DE IMPRESSORA DO ITEM 2891 PARA TODOS OS GRUPOS 

-- Insere impressoras copiadas para os itens dos grupos2 especificados 
INSERT INTO dbo.ItensImpressoras 
	(ItemHandle, 
	ImpressoraHandle, 
	EhDelivery, 
	EhBalcao, 
	EhMesa, 
	EhCartao, 
	EhThouch, 
	UsuarioInclusao, 
	DataHoraInclusao, 
	UsuarioAlteracao, 
	DataHoraAlteracao, 
	EhMonitorProducao, 
	EhMesaApp, EhCartaoApp) 

SELECT 
	ITE.HANDLE, 
	IOR.ImpressoraHandle, 
	IOR.EhDelivery, 
	IOR.EhBalcao, 
	IOR.EhMesa, 
	IOR.EhCartao, 
	IOR.EhThouch, 
	IOR.UsuarioInclusao, 
	IOR.DataHoraInclusao, 
	IOR.UsuarioAlteracao, 
	IOR.DataHoraAlteracao, 
	IOR.EhMonitorProducao, 
	IOR.EhMesaApp, 
	IOR.EhCartaoApp 

FROM ItensImpressoras IOR 
	LEFT JOIN ITENS ITE ON ITE.GR2_HANDLE IN (
		SELECT 
			numero 
		FROM dbo.f_SeparaListaDeNumeros(@GR2_HANDLE)) 
WHERE IOR.ItemHandle = @IteOrigem; 


