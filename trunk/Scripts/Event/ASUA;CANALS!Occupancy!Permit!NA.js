/**************************************************************************************************************
*	ID-2 - Send Email Active
*	Mike Linscheid
*/
try{
	if (capStatus == "Active") {
		var emailTemplateName = "CANAL_ACTIVE"
		applicantName = "-NA-"
		conArr = getContactArray();
		for (c in conArr) {
			if (conArr[c]["contactType"] == "Applicant" ) {
				applicantName = conArr[c]["firstName"] + " " + conArr[c]["lastName"]
				break
			}
		}
		
		var eParams = aa.util.newHashtable(); 
		addParameter(eParams, "$$alias$$ ", cap.getCapType().getAlias())
		addParameter(eParams, "$$altId$$",altId)
		addParameter(eParams, "$$applicantName$$", applicantName)
		//addParameter(eParams, "$$status$$", capStatus)
		addParameter(eParams, "$$userId$$", currentUserID)
		
		DLMemailList = getUserEmailsByTitle("Director of Land Management")
		PAemailList = getUserEmailsByTitle("Permit Administrator")
		
		for (e in DLMemailList) sendNotification(sysFromEmail, DLMemailList[e], "", emailTemplateName, eParams, null)
		for (e in PAemailList) sendNotification(sysFromEmail, PAemailList[e], "", emailTemplateName, eParams, null)
		
		//Send to WORKFLOW People
		sendNotification(sysFromEmail, getTaskCompletersEmail("Application Entry",getParent()), "", emailTemplateName, eParams, null)
		sendNotification(sysFromEmail, getTaskCompletersEmail("DPE Complete",getParent()), "", emailTemplateName, eParams, null)
	}
}
catch (err) {
	logDebug("A JavaScript Error occurred: ASUA:CANALS/Occupancy/Permit/NA: #02: " + err.message);
	logDebug(err.stack)
}