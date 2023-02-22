package kr.or.controller;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.service.DocService;
import kr.or.service.LabelService;
import kr.or.vo.CommonBoard;
import kr.or.vo.Doc;
import kr.or.vo.Label;
import net.coobird.thumbnailator.Thumbnailator;
import net.coobird.thumbnailator.Thumbnails;

@RestController
@RequestMapping("/label")
public class LabelController {
	
	private LabelService labelservice;
	@Autowired
	public void setLabelService(LabelService labelservice) {
		this.labelservice = labelservice;
	}
	
	//라벨 리스트
	@RequestMapping(value="/list", method=RequestMethod.POST)
	public List<Label> listLabel(@RequestBody Label label) {
		
		System.out.println("라벨 리스트");
		List<Label> listLabel = new ArrayList<Label>();
	
		listLabel = labelservice.labellist(label.getUrl());
		
		return listLabel;
	}
	

	//라벨 추가하기
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public int addLabel(@RequestBody Label label) {
		System.out.println("컨트롤러 adddoclink");
		return labelservice.addLabel(label);
	}
	
	@RequestMapping(value="/delete", method=RequestMethod.POST)
	public int deleteLabel(@RequestBody Label label) {
		System.out.println(label);
		return labelservice.deleteLabel(label);
	}
		
}
