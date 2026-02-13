package com.cfs.Resume_Analyzer;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tika.Tika;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.google.genai.GoogleGenAiChatModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin("*")
public class Resume_Controller {

    private final ChatClient chatClient;

    private final Tika tika = new Tika();

    public Resume_Controller(GoogleGenAiChatModel googleGenAiChatModel)
    {
        this.chatClient = ChatClient.create(googleGenAiChatModel);
    }

    @PostMapping("/analyze")
    public Map<String, Object> analyzer(@RequestParam("file")MultipartFile file) throws Exception
    {
        //extract text
        String content = tika.parseToString(file.getInputStream());

        String prompt = """
            You are a senior technical recruiter with 10+ years of experience hiring engineers.
            
            Your task is to evaluate this resume objectively and critically.
            
            IMPORTANT RULES:
            - Do NOT assume anything not written in the resume.
            - If information is missing, return "Not Mentioned".
            - Be realistic and unbiased.
            - Do NOT inflate scores.
            - Keep feedback concise but meaningful (2–3 sentences max per section).
            - Return ONLY valid JSON.
            - Do NOT wrap JSON in markdown.
            - Do NOT include explanations outside JSON.
            
            SCORING RULES:
            - overall_score must be between 0–100.
            - All section ratings must be between 0–10.
            - 9–10 = exceptional
            - 7–8 = strong
            - 5–6 = average
            - 3–4 = weak
            - 0–2 = very poor
            
            Evaluate based on:
            
            1. Overall Resume Quality (clarity, professionalism, impact)
            2. Technical Skills (depth, relevance, modern stack)
            3. Soft Skills (explicit evidence only)
            4. Experience (impact-driven, quantified, leadership)
            5. Projects (complexity, real-world value, technical depth)
            6. Structure & Clarity (readability, organization, ATS-friendliness)
            
            Return JSON in this EXACT format:
            
            {
              "overall_score": 0,
              "summary": "2-3 line professional evaluation",
            
              "technical_skills": {
                "rating": 0,
                "strong_areas": [],
                "missing_critical_skills": [],
                "feedback": "Short evaluation"
              },
            
              "soft_skills": {
                "rating": 0,
                "observed_skills": [],
                "missing_soft_skills": [],
                "feedback": "Short evaluation"
              },
            
              "experience_analysis": {
                "quality_rating": 0,
                "impact_based": false,
                "quantified_achievements": false,
                "leadership_indicators": false,
                "feedback": "Short evaluation"
              },
            
              "projects_analysis": {
                "innovation_rating": 0,
                "technical_depth": 0,
                "real_world_relevance": 0,
                "complexity_level": "Low / Medium / High",
                "feedback": "Short evaluation"
              },
            
              "structure_clarity": {
                "format_rating": 0,
                "readability_rating": 0,
                "section_organization": 0,
                "feedback": "Short evaluation"
              },
            
              "strengths": [],
              "weaknesses": [],
              "improvement_suggestions": [],
            
              "section_feedback": {
                "summary_section": "",
                "skills_section": "",
                "experience_section": "",
                "projects_section": "",
                "education_section": ""
              },
            
              "final_verdict": "Hire / Consider / Needs Improvement / Reject - short reason"
            }
            
            Resume Content:
            --------------------
            {{RESUME_TEXT}}
            --------------------
            """.formatted(content);


        String aiResponse = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

        String cleaned = aiResponse
                .replace("```json", "")
                .replace("```", "")
                .trim();

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> jsonMap = mapper.readValue(cleaned, Map.class);

        return jsonMap;

    }

    @PostMapping("/ats-checker")
    public Map<String, Object> analyzeATS(@RequestParam("file") MultipartFile file,
                                          @RequestParam("jd") String jobDescription) throws Exception
    {
        String resumeText = tika.parseToString(file.getInputStream());

        String prompt= """
                You are an advanced ATS (Applicant Tracking System) evaluator.
                
                Your task is to compare a candidate's resume with a given job description and perform a strict ATS compatibility analysis.
                
                IMPORTANT RULES:
                - Do NOT hallucinate skills.
                - Do NOT assume experience.
                - Only use information explicitly present.
                - If something is missing, mark it as "Not Mentioned".
                - Be strict and realistic.
                - Return ONLY valid JSON.
                - Do NOT include explanations outside JSON.
                - Keyword matching must be literal or clearly implied.
                - Do NOT inflate match score.
                
                You must analyze the following:
                
                1. Overall ATS Match Score (0-100)
                2. Role Alignment
                3. Skills Match Analysis
                4. Missing Critical Keywords
                5. Experience Relevance
                6. Tools & Technologies Match
                7. Education Match
                8. Soft Skills Match
                9. Keyword Density Assessment
                10. Optimization Suggestions
                11. Resume Rewrite Suggestions for ATS
                12. Final ATS Verdict
                
                Return JSON in this exact format:
                
                {
                  "ats_score": number (0-100),
                  "match_summary": "2-3 line strict ATS evaluation",
                
                  "role_alignment": {
                    "job_title_match": true/false,
                    "domain_match": true/false,
                    "seniority_match": true/false,
                    "feedback": ""
                  },
                
                  "skills_analysis": {
                    "total_required_skills": number,
                    "matched_skills": [],
                    "partially_matched_skills": [],
                    "missing_skills": [],
                    "match_percentage": number (0-100)
                  },
                
                  "critical_missing_keywords": [],
                
                  "experience_analysis": {
                    "relevant_experience_present": true/false,
                    "years_required": "Extracted from JD or Not Mentioned",
                    "years_present_in_resume": "Extracted or Not Mentioned",
                    "experience_match_score": number (0-10),
                    "feedback": ""
                  },
                
                  "tools_technology_match": {
                    "matched_tools": [],
                    "missing_tools": [],
                    "match_percentage": number (0-100)
                  },
                
                  "education_match": {
                    "required_education": "Extracted from JD or Not Mentioned",
                    "education_present": "From resume or Not Mentioned",
                    "match": true/false,
                    "feedback": ""
                  },
                
                  "soft_skills_match": {
                    "required_soft_skills": [],
                    "matched_soft_skills": [],
                    "missing_soft_skills": []
                  },
                
                  "keyword_density": {
                    "overused_keywords": [],
                    "underused_keywords": [],
                    "optimization_feedback": ""
                  },
                
                  "ats_optimization_suggestions": [],
                
                  "rewrite_suggestions": {
                    "summary_rewrite": "",
                    "experience_rewrite_example": "",
                    "skills_section_improvement": ""
                  },
                
                  "final_verdict": "Strong Match / Moderate Match / Weak Match / Not Suitable with short reason"
                }
                
                Now perform analysis using:
                
                JOB DESCRIPTION:
                --------------------
                {{JOB_DESCRIPTION}}
                --------------------
                
                RESUME:
                --------------------
                {{RESUME_TEXT}}
                --------------------
                
                """.formatted(resumeText, jobDescription);

        String aiResponse = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

        String cleaned = aiResponse
                .replace("```json", "")
                .replace("```", "")
                .trim();

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> jsonMap = mapper.readValue(cleaned, Map.class);

        return jsonMap;
    }

}
